module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        'es6': true,
        'node': true,
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ],
    'overrides': [
        {
            'env': {
                'node': true
            },
            'files': [
                '.eslintrc.{js,cjs}'
            ],
            'parserOptions': {
                'sourceType': 'script'
            },
        },
        {
            'files': ['*.js'],
            'parserOptions': {
                'project': []
            }
        }
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module',
        'project': './tsconfig.json'
    },
    'plugins': [
        '@typescript-eslint',
        'react',
        'react-hooks',
        'prettier'
    ],
    'rules': {
        'indent': [
            'error',
            2,
            {
                'SwitchCase': 1
            }
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single',
            {
                'avoidEscape': true
            }
        ],
        'semi': [
            'error',
            'always'
        ],
        'no-empty-function': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        'react/display-name': 'off',
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'prettier/prettier': 'warn',
    },
    'settings': {
        'react': {
            'version': 'detect',
        }
    },
};
