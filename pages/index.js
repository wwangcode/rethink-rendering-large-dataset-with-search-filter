import styled from 'styled-components'
import faker from 'faker'
import { useState, useRef, useEffect } from 'react'
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from 'react-virtualized'


export default function Home() {
  const cache = useRef(new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 100,
  }))
  const [ data, setData ] = useState(
    [...Array(10000).keys()].map(index => ({
      id: index,
      department: faker.commerce.department(),
      productName: faker.commerce.productName(),
      price: faker.commerce.price(),
      lastStocked: faker.date.past(),
      productDescription: faker.commerce.productDescription(),
    }))
  )
  const [ filteredData, setFilteredData ] = useState(data)
  const [ filterString, setFilterString ] = useState('')
  const [ oldFilterString, setOldFilterString ] = useState(filterString)

  useEffect(() => {
      handleFiltering()
  }, [filterString])

  const handleFilterString = (e) => {
    e.preventDefault()
    setOldFilterString(filterString)
    setFilterString(e.target.value.toLowerCase())
  }

  const handleFiltering = () => {
    if (filterString.startsWith(oldFilterString)) {
      setFilteredData(filteredData.filter(item => item.productName.toLowerCase().includes(filterString)))
    } else {
      setFilteredData(data.filter(item => item.productName.toLowerCase().includes(filterString)))
    }
  }

  const objectPropertyCheck = (item) => {
    if (typeof item === 'undefined') return false
    if (typeof item.productName === 'undefined') return false
    if (typeof item.price === 'undefined') return false
    if (typeof item.productDescription === 'undefined') return false
    if (typeof item.department === 'undefined') return false
    if (typeof item.lastStocked === 'undefined') return false
    else return true
  }

  return (
    <Container>
      <Title>XYZ Product Catalogue</Title>
      <Input type='text' value={filterString} onChange={handleFilterString} placeholder='Search for product...'></Input>
      {filteredData.length > 0 && (
        <div style={{ width: '50vw', height: '100vh', textAlign: 'left', margin: '0 auto', }}>
          <AutoSizer>
            {({width, height}) => (
              <List 
                width={width} 
                height={height} 
                rowHeight={cache.current.rowHeight} 
                deferredMeasurementCache={cache.current}
                rowCount={filteredData.length} 
                rowRenderer={({key, index, style, parent}) => {
                  const item = filteredData[index]
                  return (
                    <>
                    {objectPropertyCheck(item) && (
                      <CellMeasurer key={key} cache={cache.current} parent={parent} columnIndex={0} rowIndex={index}>
                        <div style={style}>
                          <h2 style={{ color: '#03dac5'}}>{item.productName}</h2>
                          <p style={{ padding: '.25rem 0'}}><span style={{ color: '#bb86fc'}}>Price:</span>{` $${item.price}`}</p>
                          <p style={{ padding: '.25rem 0'}}><span style={{ color: '#bb86fc'}}>Description:</span>{` ${item.productDescription}`}</p>
                          <p style={{ padding: '.25rem 0'}}><span style={{ color: '#bb86fc'}}>Department:</span>{` ${item.department}`}</p>
                          <p style={{ padding: '.25rem 0'}}><span style={{ color: '#bb86fc'}}>Last Stocked:</span>{` ${item.lastStocked}`}</p>
                          <br />
                        </div>
                      </CellMeasurer>
                    )}
                    </>
                  )
                }} 
              />
            )}
          </AutoSizer>
        </div>
      )}
      {filteredData.length === 0 && (<NoResults>No Results Found</NoResults>)}
    </Container>
  )
}


const Title = styled.header`
  font-size: 4rem;
  margin: 3rem auto;
`;

const Input = styled.input`
    width: 25rem;
    height: 3rem;
    padding: 0 1rem;
    text-align: left;
    border-radius: 1rem;
    border: 1px solid white;
    margin-bottom: 3rem;
    font-weight: 300;
    font-size: 1.5rem;
    &:focus {
        border: 2px solid white;
        outline: 0;
    }
`;

const NoResults = styled.div`
    font-size: 2rem;

`;

const Container = styled.main`
  margin: 0 auto;
  text-align: center;
`;
