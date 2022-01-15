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
import './VwModel.scss';


function VwModels() {
    //Use React Hooks to set the initial GraphQL query to a variable named `query`
    // If query is not defined, persistent query will be requested
    // Initially use cached / persistent query.
    const [query, setQuery] = useState('');
    const persistentQuery = 'wknd/vw-car-models-query';
    //Use a custom React Hook to execute the GraphQL query
    const { data, errorMessage } = useGraphQL(query, persistentQuery);

    //If there is an error with the GraphQL query
    if(errorMessage) return <Error errorMessage={errorMessage} />;

    //If data is null then return a loading state...
    if(!data) return <Loading />;
    
    return (
        <div className="vwModels">
          <button onClick={() => setQuery('')}>All</button>
          <button onClick={() => setQuery(filterQuery('Kleinwagen'))}>Kleinwagen</button>
          <button onClick={() => setQuery(filterQuery('Kombi'))}>Kombi</button>
          <button onClick={() => setQuery(filterQuery('SUV'))}>SUV</button>
          <ul className="vwModel-items">
            {
                //Iterate over the returned data items from the query
                data.carModelList.items.map((vwModel, index) => {
                    return (
                        <VwModelItem key={index} {...vwModel} />
                    );
                })
            }
            </ul>
        </div>
    );
}

// Render individual vwModel item
function VwModelItem(props) {

  //Must have title, path, and image
  if(!props || !props._path || !props.modelName || !props.modelImage ) {
    return null;
  }
  return (
        <li className="vwModel-item">
          <div className="vwModel-item-title">{props.modelName}</div>
            <img className="vwModel-item-image" src={props.modelImage} 
                 alt={props.modelName}/>
          <div className="vwModel-item-length-price">
          <div className="vwModel-item-price">{props.modelPrice}</div>
          <div className="vwModel-item-length">{props.modelDescription}</div>
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
            value: "VW"
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


export default VwModels;
