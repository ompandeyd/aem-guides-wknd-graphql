/*
Copyright 2020 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import useGraphQL from '../api/useGraphQL';
import Error from './Error';
import Loading from './Loading';
import './Adventures.scss';


function Adventures() {
    //Use React Hooks to set the initial GraphQL query to a variable named `query`
    // If query is not defined, persistent query will be requested
    // Initially use cached / persistent query.
    const [query, setQuery] = useState('');
    const persistentQuery = 'wknd/plain-car-model-query';
    //Use a custom React Hook to execute the GraphQL query
    const { data, errorMessage } = useGraphQL(query, persistentQuery);

    //If there is an error with the GraphQL query
    if(errorMessage) return <Error errorMessage={errorMessage} />;

    //If data is null then return a loading state...
    if(!data) return <Loading />;
    
    return (
        <div className="adventures">
          <button onClick={() => setQuery('')}>All</button>
          <button onClick={() => setQuery(filterQuery('e-Tron'))}>e-Tron</button>
          <button onClick={() => setQuery(filterQuery('e-Tron GT'))}>e-Tron GT</button>
          <button onClick={() => setQuery(filterQuery('A1'))}>A1</button>
          <button onClick={() => setQuery(filterQuery('A3'))}>A3</button>
          <button onClick={() => setQuery(filterQuery('A4'))}>A4</button>
          <button onClick={() => setQuery(filterQuery('A5'))}>A5</button>
          <button onClick={() => setQuery(filterQuery('A6'))}>A6</button>
          <button onClick={() => setQuery(filterQuery('A7'))}>A7</button>
          <ul className="adventure-items">
            {
                //Iterate over the returned data items from the query
                data.carModelList.items.map((adventure, index) => {
                    return (
                        <AdventureItem key={index} {...adventure} />
                    );
                })
            }
            </ul>
        </div>
    );
}

// Render individual Adventure item
function AdventureItem(props) {

  //Must have title, path, and image
  if(!props || !props._path || !props.modelName || !props.modelImage ) {
    return null;
  }
  return (
        <li className="adventure-item">
          <div className="adventure-item-title">{props.modelName}</div>
          <Link to={`/adventure:${props._path}`}>
            <img className="adventure-item-image" src={props.modelImage} 
                 alt={props.modelName}/>
          </Link>
          <div className="adventure-item-length-price">
          <div className="adventure-item-price">{props.modelPrice}</div>
          <div className="adventure-item-length">{props.modelDescription}</div>
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


export default Adventures;
