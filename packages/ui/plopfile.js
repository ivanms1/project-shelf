module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'Create a component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: "What is this component's name?",
      },
      {
        type: 'input',
        name: 'element',
        message: 'HTML element (div is default)',
        default: 'div',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '{{pascalCase name}}/index.tsx',
        templateFile: 'templates/Component.tsx.hbs',
      },
      {
        type: 'add',
        path: '{{pascalCase name}}/{{pascalCase name}}.css.ts',
        templateFile: 'templates/styles.ts.hbs',
      },
    ],
  });
};
