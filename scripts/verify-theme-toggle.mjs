import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import ts from "typescript";

const require = createRequire(import.meta.url);
const rootDirectory = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = await readFile(
  join(rootDirectory, "components/theme-toggle.tsx"),
  "utf8",
);
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    esModuleInterop: true,
    jsx: ts.JsxEmit.ReactJSX,
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;

function loadToggle({ mounted, resolvedTheme }) {
  const effects = [];
  const mountedUpdates = [];
  const themeUpdates = [];
  const react = {
    ...require("react"),
    useEffect(effect, dependencies) {
      effects.push({ dependencies, effect });
    },
    useState(initialValue) {
      assert.equal(initialValue, false);
      return [mounted, (value) => mountedUpdates.push(value)];
    },
  };
  const localRequire = (specifier) => {
    if (specifier === "react") return react;
    if (specifier === "next-themes") {
      return {
        useTheme: () => ({
          resolvedTheme,
          setTheme: (value) => themeUpdates.push(value),
        }),
      };
    }
    return require(specifier);
  };
  const componentModule = { exports: {} };

  Function("require", "module", "exports", compiled)(
    localRequire,
    componentModule,
    componentModule.exports,
  );

  const element = componentModule.exports.ThemeToggle();
  assert.equal(effects.length, 1);
  assert.deepEqual(effects[0].dependencies, []);

  return { effects, element, mountedUpdates, themeUpdates };
}

for (const resolvedTheme of [undefined, "dark", "light"]) {
  const result = loadToggle({ mounted: false, resolvedTheme });
  assert.equal(result.element.props["aria-label"], "Toggle theme");
  assert.equal(result.element.props.disabled, true);
  assert.equal(result.element.props.children, "·");
  result.effects[0].effect();
  assert.deepEqual(result.mountedUpdates, [true]);
}

const dark = loadToggle({ mounted: true, resolvedTheme: "dark" });
assert.equal(dark.element.props["aria-label"], "Switch to light mode");
assert.equal(dark.element.props.disabled, false);
assert.equal(dark.element.props.children, "D");
dark.element.props.onClick();
assert.deepEqual(dark.themeUpdates, ["light"]);

const light = loadToggle({ mounted: true, resolvedTheme: "light" });
assert.equal(light.element.props["aria-label"], "Switch to dark mode");
assert.equal(light.element.props.disabled, false);
assert.equal(light.element.props.children, "L");
light.element.props.onClick();
assert.deepEqual(light.themeUpdates, ["dark"]);

console.log("Theme toggle hydration guard verified.");
