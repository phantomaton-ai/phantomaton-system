import sigilium from 'sigilium';
import priestess from 'priestess';

const system = sigilium.composite('system');
const systemPrompt = sigilium.sigil('system.prompt');

system.provider([priestess.input.resolve], ([getInput]) => () => {
  const input = getInput();
  return `System prompt from user input: ${input}`;
});

system.decorator([systemPrompt.resolve], (providers) => (fn) => (...args) => {
  const prompts = providers.map(p => p(...args));
  return prompts.join('\n');
});

export { system, systemPrompt };