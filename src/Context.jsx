import React from 'react';

const Context =  React.createContext([
    { _id: '666',
      status: 'Open',
      owner: 'ExampleRecord',
      created: '2016-08-15T00:00:00.000Z',
      effort: 5,
      completionDate: '2017-03-03T00:00:00.000Z',
      title: 'ExampleRecord' }
]);
 
export default Context;
