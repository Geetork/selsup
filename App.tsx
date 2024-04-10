import React, { useState } from 'react';

type ParamTypes = string;

interface Param {
  id: number;
  name: string;
  type?: string;
}

interface ParamValue<T> {
   paramId: number;
   value: T;
}

interface Model<T> {
   paramValues: Array<ParamValue<T>>;
}

interface Props<T extends ParamTypes> {
   params: Array<Param>;
   model: Model<T>;
}


/**
 * A React component for editing model
 * 
 * @component
 * @param {Array<Param>} params - editor parameters
 * @param {Model<T>} model - model data
 * @returns {React.ReactElement} - Returns a React element representing an editing form
*/
const ParamEditor:React.FC<Props<ParamTypes>> = ({ params, model }) => {
  const [editedModel, setEditedModel] = useState(model);

  // returns updated model
  const getModel = (event: React.MouseEvent<HTMLFormElement>): Model<ParamTypes> => {
    event.preventDefault();
    console.log(editedModel);

    return editedModel;
  }

  // returns a parameter's model value by parameter id
  const getParamValueById = (id: number): ParamTypes => {
    let paramValue = editedModel.paramValues.find(item => item.paramId === id);

    return paramValue?.value || '';
  }

  // handles input changes
  const handleInputChange = ({ paramId, value }: ParamValue<ParamTypes>): void => {
      setEditedModel((prev) => ({
        ...prev,
        paramValues: prev.paramValues.map(param => param.paramId === paramId ? { ...param, value } : param)
      }));
  };

  return (
    <form onSubmit={getModel}>
      {
        params.length && 
        <>
          {
            params.map((param, id) => (
              <div key={id} style={{ display: 'flex', flexDirection: 'column', width: '250px' }}>
                <label htmlFor={param.name}>{param.name}</label>
                <input id={param.name} 
                       type="text"
                       onChange={(e) => handleInputChange({paramId: param.id, value: (e.target.value as 'string')})} 
                       value={getParamValueById(param.id)}/>
              </div>
            ))
          }
          <input type="submit" value="Получить модель" style={{ marginTop: '10px' }} />
        </>
      }
    </form>
  )
}

/**
 * A React component for testing model editor
*/
const App = () => {
  // model data
  const model = {
    "paramValues": [
      {
        "paramId": 1,
        "value": "повседневное"
      },
      {
        "paramId": 2,
        "value": "макси"
      }
    ] 
  };

  // model parameters
  const params = [
    {
      "id": 1,
      "name": "Назначение",
    },
    {
      "id": 2,
      "name": "Длина",
    },
  ];

  return (
    <ParamEditor 
      params={params}
      model={model}/>
  );
}

export default App;
