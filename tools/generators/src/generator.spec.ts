import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree } from '@nx/devkit';
import { libraryGenerator } from '@nx/angular/generators';
import generatorGenerator from './generator';

// Mock the libraryGenerator to avoid actual file creation during tests
jest.mock('@nx/angular/generators', () => ({
  libraryGenerator: jest.fn().mockResolvedValue({}),
  UnitTestRunner: { Jest: 'jest' },
}));

describe('generatorGenerator', () => {
  let tree: Tree;

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
    jest.clearAllMocks();
  });

  it('should create a base component library when createBaseComponent is true', async () => {
    await generatorGenerator(tree, {
      path: '',
      name: 'test-feature',
      createBaseComponent: true,
      createSingleComponent: false,
      createDataAccess: false,
    });

    expect(libraryGenerator).toHaveBeenCalledWith(
      tree,
      expect.objectContaining({
        name: 'test-feature',
        directory: 'libs/test-feature/features/test-feature',
        importPath: '@builder/test-feature',
        standalone: true,
        flat: true,
      })
    );
  });

  it('should exit early when createSingleComponent is true', async () => {
    await generatorGenerator(tree, {
      path: '',
      name: 'test-feature',
      createBaseComponent: true,
      createSingleComponent: true,
      createDataAccess: true,
    });

    // Check that libraryGenerator was called once for base component
    expect(libraryGenerator).toHaveBeenCalledTimes(1);
    expect(libraryGenerator).toHaveBeenCalledWith(
      tree,
      expect.objectContaining({
        name: 'test-feature',
        directory: 'libs/test-feature',
        importPath: '@builder/test-feature',
      })
    );
  });

  it('should create data-access library when createDataAccess is true', async () => {
    await generatorGenerator(tree, {
      path: '',
      name: 'test-feature',
      createBaseComponent: false,
      createSingleComponent: false,
      createDataAccess: true,
    });

    expect(libraryGenerator).toHaveBeenCalledWith(
      tree,
      expect.objectContaining({
        name: 'test-feature/data-access',
        directory: 'libs/test-feature/data-access',
        importPath: '@builder/test-feature/data-access',
      })
    );
  });

  it('should create shell library by default', async () => {
    await generatorGenerator(tree, {
      path: '',
      name: 'test-feature',
      createBaseComponent: false,
      createSingleComponent: false,
      createDataAccess: false,
    });

    expect(libraryGenerator).toHaveBeenCalledWith(
      tree,
      expect.objectContaining({
        name: 'test-feature/shell',
        directory: 'libs/test-feature/features/shell',
        importPath: '@builder/test-feature/shell',
        routing: true,
      })
    );
  });

  it('should create lib.routes.ts file with proper content', async () => {
    // Mock tree.exists and tree.write to simulate file operations
    tree.exists = jest.fn().mockReturnValue(false);
    tree.write = jest.fn();

    await generatorGenerator(tree, {
      path: '',
      name: 'test-feature',
      createBaseComponent: false,
      createSingleComponent: false,
      createDataAccess: false,
    });

    expect(tree.write).toHaveBeenCalledWith(
      'libs/test-feature/features/shell/src/lib/lib.routes.ts',
      expect.stringContaining('export const TEST_FEATURE_ROUTES: Route[] = [];')
    );
  });

  it('should create lib.routes.spec.ts file with proper test content', async () => {
    // Mock tree.exists and tree.write to simulate file operations
    tree.exists = jest.fn().mockReturnValue(false);
    tree.write = jest.fn();

    await generatorGenerator(tree, {
      path: '',
      name: 'test-feature',
      createBaseComponent: false,
      createSingleComponent: false,
      createDataAccess: false,
    });

    expect(tree.write).toHaveBeenCalledWith(
      'libs/test-feature/features/shell/src/lib/lib.routes.spec.ts',
      expect.stringContaining("describe('test-featureRoutes'")
    );
    expect(tree.write).toHaveBeenCalledWith(
      'libs/test-feature/features/shell/src/lib/lib.routes.spec.ts',
      expect.stringContaining('expect(rootRoute).toBeDefined();')
    );
  });

  it('should handle custom path option', async () => {
    await generatorGenerator(tree, {
      name: 'test-feature',
      path: 'custom-path',
      createBaseComponent: true,
      createSingleComponent: false,
      createDataAccess: false,
    });

    expect(libraryGenerator).toHaveBeenCalledWith(
      tree,
      expect.objectContaining({
        name: 'test-feature',
        directory: 'libs/custom-path/features/test-feature',
        importPath: '@builder/test-feature',
      })
    );
  });

  it('should not create duplicate folders if they already exist', async () => {
    // Mock tree.exists to return true for data-access dir
    tree.exists = jest.fn().mockImplementation((path) => {
      if (path === 'libs/test-feature/data-access') {
        return true;
      }
      return false;
    });
    tree.write = jest.fn();

    await generatorGenerator(tree, {
      path: '',
      name: 'test-feature',
      createBaseComponent: false,
      createSingleComponent: false,
      createDataAccess: true,
    });

    // Should not call libraryGenerator for data-access since it exists
    expect(libraryGenerator).not.toHaveBeenCalledWith(
      tree,
      expect.objectContaining({
        name: 'test-feature/data-access',
      })
    );
  });
});
