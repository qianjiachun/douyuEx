const jsModules = import.meta.glob(['./**/*.js', '!./entry.js', '!./runtime.js', '!./main.js']);
const cssModules = import.meta.glob('./**/*.css');

const loadByPath = async (modules) => {
  const paths = Object.keys(modules).sort((a, b) => a.localeCompare(b));
  for (const modulePath of paths) {
    await modules[modulePath]();
  }
};

await loadByPath(jsModules);
await loadByPath(cssModules);
await import('./runtime.js');
