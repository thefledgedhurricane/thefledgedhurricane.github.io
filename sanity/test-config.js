const config = require('./sanity.config.ts');

console.log('Sanity configuration loaded successfully!');
console.log('Project ID:', config.default.projectId);
console.log('Dataset:', config.default.dataset);
console.log('Schema types:', config.default.schema.types.length);
console.log('Available schemas:');
config.default.schema.types.forEach(type => {
  console.log(`- ${type.name}: ${type.title}`);
});