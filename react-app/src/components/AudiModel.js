/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React, {useState} from 'react';
import useGraphQL from '../api/useGraphQL';
import Error from './Error';
import Loading from './Loading';
import './AudiModel.scss';


function AudiModels() {
    //Use React Hooks to set the initial GraphQL query to a variable named `query`
    // If query is not defined, persistent query will be requested
    // Initially use cached / persistent query.
    const [query, setQuery] = useState('');
    const persistentQuery = 'wknd/audi-car-models-query';
    //Use a custom React Hook to execute the GraphQL query
    const { data, errorMessage } = useGraphQL(query, persistentQuery);

    //If there is an error with the GraphQL query
    if(errorMessage) return <Error errorMessage={errorMessage} />;

    //If data is null then return a loading state...
    if(!data) return <Loading />;
    
    return (
        <div className="audiModels">
          <button onClick={() => setQuery('')}>All</button>
          <button onClick={() => setQuery(filterQuery('e-Tron'))}>e-Tron</button>
          <button onClick={() => setQuery(filterQuery('e-Tron GT'))}>e-Tron GT</button>
          <button onClick={() => setQuery(filterQuery('A1'))}>A1</button>
          <button onClick={() => setQuery(filterQuery('A3'))}>A3</button>
          <button onClick={() => setQuery(filterQuery('A4'))}>A4</button>
          <button onClick={() => setQuery(filterQuery('A5'))}>A5</button>
          <button onClick={() => setQuery(filterQuery('A6'))}>A6</button>
          <button onClick={() => setQuery(filterQuery('A7'))}>A7</button>
          <ul className="audiModel-items">
            {
                //Iterate over the returned data items from the query
                data.carModelList.items.map((audiModel, index) => {
                    return (
                        <AudiModelItem key={index} {...audiModel} />
                    );
                })
            }
            </ul>
        </div>
    );
}

// Render individual AudiModel item
function AudiModelItem(props) {

  //Must have title, path, and image
  if(!props || !props._path || !props.modelName || !props.modelImage ) {
    return null;
  }
  return (
        <li className="audiModel-item">
          <div className="audiModel-item-title">{props.modelName}</div>
            <img className="audiModel-item-image" src={props.modelImage} 
                 alt={props.modelName}/>
          <div className="audiModel-item-length-price">
          <div className="audiModel-item-price">{props.modelPrice}</div>
          <div className="audiModel-item-length">{props.modelDescription}</div>
          </div>
      </li>
      );
}

/**
 * Returns a query for Car Model filtered by carModelType
 */
function filterQuery(carModelType) {
  return `{
    carModelList (filter: {
      modelType: {
        _expressions: [
          {
            value: "${carModelType}"
          }
        ]
      }
      modelBrand: {
        _expressions: [
          {
            value: "Audi"
          }
        ]
      }
    }){
      items {
         _path
        modelName
        modelBrand
        modelType
        modelPrice
        modelImage
        modelDescription
      }
    }
  }
  `;
}


export default AudiModels;
