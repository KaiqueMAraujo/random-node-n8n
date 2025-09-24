import { INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';

export class Random implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Random',
    name: 'random',
    group: ['transform'],
    version: 1,
    description: 'Gera um número aleatório usando Random.org',
    defaults: { name: 'Random' },
    inputs: ['main'],
    outputs: ['main'],
    properties: [
      { displayName: 'Min', name: 'min', type: 'number', default: 1, description: 'Valor mínimo do intervalo' },
      { displayName: 'Max', name: 'max', type: 'number', default: 10, description: 'Valor máximo do intervalo' },
    ],
  };

  async execute(): Promise<INodeExecutionData[][]> {
    const returnData: INodeExecutionData[] = [];

    const min = 1;
    const max = 10;

    const url = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;

    const response = await fetch(url);
    const text = await response.text();

    returnData.push({
      json: {
        randomNumber: parseInt(text.trim(), 10),
      },
    });

    return [returnData];
  }
}
