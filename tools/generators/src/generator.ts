import { joinPathFragments, Tree } from '@nx/devkit';
import { libraryGenerator, UnitTestRunner } from '@nx/angular/generators';
import { Schema } from '@nx/angular/src/generators/library/schema';
import { GeneratorGeneratorSchema } from './schema';

export async function generatorGenerator(
  tree: Tree,
  options: GeneratorGeneratorSchema,
) {
  const projectRoot = `libs/${options.path || options.name}`;
  const featuresDir = joinPathFragments(projectRoot, 'features');
  const dataAccessDir = joinPathFragments(projectRoot, 'data-access');
  const shellDir = joinPathFragments(featuresDir, 'shell');
  const baseComponentDir = joinPathFragments(
    options.createSingleComponent
      ? projectRoot
      : `${featuresDir}/${options.name}`,
  );

  const config: Schema = {
    name: options.name,
    simpleName: true,
    standalone: true,
    commonModule: false,
    prefix: 'builder',
    style: 'scss',
    changeDetection: 'OnPush',
    directory: baseComponentDir,
    importPath: `@builder/${options.name}`,
    linter: 'eslint',
    unitTestRunner: UnitTestRunner.Jest,
    strict: true,
    flat: true,
  };

  if (options.createBaseComponent) {
    await libraryGenerator(tree, config);
  }

  if (options.createSingleComponent) {
    return;
  }

  if (options.createDataAccess) {
    if (!tree.exists(dataAccessDir)) {
      const libName = `${options.name}/data-access`;
      await libraryGenerator(tree, {
        name: libName,
        directory: dataAccessDir,
        importPath: `@builder/${options.name}/data-access`,
        unitTestRunner: UnitTestRunner.None,
        skipTests: true,
        spec: false,
      });

      const srcDataAccessPath = joinPathFragments(dataAccessDir, 'src');
      const libIndexPath = joinPathFragments(srcDataAccessPath, 'lib/index.ts');
      const indexFilePath = joinPathFragments(srcDataAccessPath, 'index.ts');

      tree.write(libIndexPath, '');
      tree.write(indexFilePath, '');

      const dataAccessComponentDir = joinPathFragments(
        srcDataAccessPath,
        `lib/${options.name}`,
      );

      if (tree.exists(dataAccessComponentDir)) {
        tree.delete(dataAccessComponentDir);
      }
    }
  }

  if (!tree.exists(shellDir) && !options.skipShell) {
    const libName = `${options.name}/shell`;
    await libraryGenerator(tree, {
      name: libName,
      skipModule: true,
      standalone: true,
      simpleName: true,
      skipTests: true,
      linter: 'eslint',
      strict: true,
      prefix: 'builder',
      directory: shellDir,
      importPath: `@builder/${options.name}/shell`,
      unitTestRunner: UnitTestRunner.Jest,
      routing: true,
    });

    const srcShellPath = joinPathFragments(shellDir, 'src');
    const routesPath = joinPathFragments(srcShellPath, 'lib/lib.routes.ts');
    const routesTestPath = joinPathFragments(
      srcShellPath,
      'lib/lib.routes.spec.ts',
    );
    const indexFilePath = joinPathFragments(srcShellPath, 'index.ts');
    const routesName = `${options.name
      .replace(/-/g, '_')
      .toUpperCase()}_ROUTES`;

    tree.write(
      routesPath,
      `import { Route } from '@angular/router';

export const ${routesName}: Route[] = [];
`,
    );
    tree.write(
      routesTestPath,
      `
import { Route } from '@angular/router';
import { ${routesName} } from './lib.routes';

describe('${options.name}Routes', () => {
  let routes: Route[];

  beforeEach(() => {
    routes = ${routesName};
  });

  it('should contain routes array', () => {
    expect(routes).toBeDefined();
    expect(Array.isArray(routes)).toBeTruthy();
  });

  it('should have a root route with empty path', () => {
    const rootRoute = routes.find((route) => route.path === '');
    expect(rootRoute).toBeDefined();
  });
});
`,
    );
    tree.write(indexFilePath, `export * from './lib/lib.routes';`);

    const shellComponentDir = joinPathFragments(
      srcShellPath,
      `lib/${options.name}`,
    );

    if (tree.exists(shellComponentDir)) {
      tree.delete(shellComponentDir);
    }
  }
}

export default generatorGenerator;
