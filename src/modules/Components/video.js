import React,{useState, useEffect } from 'react'
import Dropzone from 'react-dropzone'
import { fireEvent, render } from 'react-testing-library'
import Header from './Header.js';
import Sidebar from './Sidebar.js';



// import api
import FetchAPI from '../../api/APIs.js';

export default function Editor(mainProps) {
const props = mainProps.location.state;
const type = props.type;
const operation = props.operation;

console.log(props)

let pathLink = '';
let titleText = '';
switch(type){

  case 'Events'        :   titleText = 'Events'        ; pathLink = '/Events';  break;
  case 'Directions'    :   titleText = 'Directions'    ; pathLink = '/Directions'; break;
  case 'DimpleAnil'    :   titleText = 'DimpleAnil'    ; pathLink = '/DimpleAnil'; break;
  case 'AboutGC'       :   titleText = 'AboutGC'       ; pathLink = '/AboutGC'; break;
  case 'Introduction'  :   titleText = 'Introduction'  ; pathLink = '/Introduction'; break;
  case 'OBEs'          :   titleText = 'OBEs'          ; pathLink = '/OBEs'; break;
  case 'about'         :   titleText = 'About us'      ; pathLink = '/About'; break;
  case 'contact'       :   titleText = 'Contact'       ; pathLink = '/Contact'; break;
  case 'Miracles'      :   titleText = ' Miracles'     ; pathLink = '/Miracles'; break;
  case 'Prayers'       :   titleText = ' Prayers'      ; pathLink = '/Prayers'; break;
}





test('invoke onDragEnter when dragenter event occurs', async () => {
  const file = new File([
    JSON.stringify({ping: true})
  ], 'ping.json', { type: 'application/json' })
  const data = mockData([file])
  const onDragEnter = jest.fn()
 
  const ui = (
    <Dropzone onDragEnter={onDragEnter}>
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
        </div>
      )}
    </Dropzone>
  )
  const { container } = render(ui)
  const dropzone = container.querySelector('div')
 
  dispatchEvt(dropzone, 'dragenter', data)
  await flushPromises(ui, container)
 
  expect(onDragEnter).toHaveBeenCalled()
})
 
function flushPromises(ui, container) {
  return new Promise(resolve =>
    setImmediate(() => {
      render(ui, { container })
      resolve(container)
    })
  )
}
 
function dispatchEvt(node, type, data) {
  const event = new Event(type, { bubbles: true })
  Object.assign(event, data)
  fireEvent(node, event)
}
 
function mockData(files) {
  return {
  
     
 
    dataTransfer: {
      files,
      items: files.map(file => ({
        kind: 'file',
        type: file.type,
        getAsFile: () => file
      })),
      types: ['Files']

    }
  
  }

}
}