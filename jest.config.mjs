/** @type {import('jest').Config} */
const config = {
    resolver: 'ts-jest-resolver',
    extensionsToTreatAsEsm: ['.ts'],
    transform: {
        '^.+\\.(t|j)sx?$': [
            'esbuild-jest',
            {
                sourceMaps: true,
                format: 'esm',
                target: 'es2022',
            },
        ],
    },
};

export default config;
