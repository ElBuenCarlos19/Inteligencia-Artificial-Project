const { Engine } = require('json-rules-engine');

const engine = new Engine();

engine.addRule({
  conditions: {
    all: [
      { fact: 'age', operator: 'greaterThanInclusive', value: 18 }
    ]
  },
  event: {
    type: 'adult',
    params: { message: 'La persona es mayor de edad' }
  }
});

engine
  .run({ age: 15 })
  .then(results => {
    results.events.map(event => console.log(event.params.message));
  });

module.exports = {
    engine
};