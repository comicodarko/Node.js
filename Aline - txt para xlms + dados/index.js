const lineReader = require('line-reader');
const fs = require('fs');
const xlsx = require('node-xlsx').default;

const ddd = {
  11: 'SP',
  12: 'SP',
  13: 'SP',
  14: 'SP',
  15: 'SP',
  16: 'SP',
  17: 'SP',
  18: 'SP',
  19: 'SP',
  21: 'RJ',
  22: 'RJ',
  24: 'RJ',
  27: 'ES',
  28: 'ES',
  31: 'MG',
  32: 'MG',
  33: 'MG',
  34: 'MG',
  35: 'MG',
  37: 'MG',
  38: 'MG',
  41: 'PR',
  42: 'PR',
  43: 'PR',
  44: 'PR',
  45: 'PR',
  46: 'PR',
  47: 'SC',
  48: 'SC',
  49: 'SC',
  51: 'RS',
  53: 'RS',
  54: 'RS',
  55: 'RS',
  61: 'DF',
  62: 'GO',
  63: 'TO',
  64: 'GO',
  65: 'MT',
  66: 'MT',
  67: 'MS',
  68: 'AC',
  69: 'RO',
  71: 'BA',
  73: 'BA',
  74: 'BA',
  75: 'BA',
  77: 'BA',
  79: 'SE',
  81: 'PE',
  82: 'AL',
  83: 'PB',
  84: 'RN',
  85: 'CE',
  86: 'PI',
  87: 'PE',
  88: 'CE',
  89: 'PI',
  91: 'PA',
  92: 'AM',
  93: 'PA',
  94: 'PA',
  95: 'RR',
  96: 'AP',
  97: 'AM',
  98: 'MA',
  99: 'MA'
};

const states = {
  AC: 'Acre',
  AL: 'Alagoas',
  AP: 'Amapá',
  AM: 'Amazonas',
  BA: 'Bahia',
  CE: 'Ceará',
  DF: 'Distrito Federal',
  ES: 'Espírito Santo',
  GO: 'Goías',
  MA: 'Maranhão',
  MT: 'Mato Grosso',
  MS: 'Mato Grosso do Sul',
  MG: 'Minas Gerais',
  PA: 'Pará',
  PB: 'Paraíba',
  PR: 'Paraná',
  PE: 'Pernambuco',
  PI: 'Piauí',
  RJ: 'Rio de Janeiro',
  RN: 'Rio Grande do Norte',
  RS: 'Rio Grande do Sul',
  RO: 'Rondônia',
  RR: 'Roraíma',
  SC: 'Santa Catarina',
  SP: 'São Paulo',
  SE: 'Sergipe',
  TO: 'Tocantins'
};

const regions = {
  AC: 'Norte',
  AL: 'Nordeste',
  AP: 'Norte',
  AM: 'Norte',
  BA: 'Nordeste',
  CE: 'Nordeste',
  DF: 'Centro-Oeste',
  ES: 'Sudeste',
  GO: 'Centro-Oeste',
  MA: 'Nordeste',
  MT: 'Centro-Oeste',
  MS: 'Centro-Oeste',
  MG: 'Sudeste',
  PA: 'Norte',
  PB: 'Nordeste',
  PR: 'Sul',
  PE: 'Nordeste',
  PI: 'Nordeste',
  RJ: 'Sudeste',
  RN: 'Nordeste',
  RS: 'Sul',
  RO: 'Norte',
  RR: 'Norte',
  SC: 'Sul',
  SP: 'Sudeste',
  SE: 'Nordeste',
  TO: 'Norte'
};

const filename = 'Maio';
let array = [];

lineReader.eachLine(`./${filename}.txt`, (line, last) => {
  if (line.startsWith('(')) {
    array[array.length - 1].number = line;
    array[array.length - 1].uf = ddd[line.slice(1, 3)];
    array[array.length - 1].state = states[array[array.length - 1].uf];
    array[array.length - 1].region = regions[array[array.length - 1].uf];
  } else {
    if (line) {
      const client = {
        name: line,
        number: '',
        uf: '',
        state: ''
      };
      array.push(client);
    }
  }
  if (last) {
    data = array.map(client => {
      return [client.name, client.number, client.uf, client.region];
    });
    const buffer = xlsx.build([{ name: 'test', data }]);
    fs.createWriteStream(`./${filename}.xlsx`).write(buffer);
    console.log(`Concluído ${filename}`);
  }
});
