import CreatableSelect from 'react-select/creatable';
// ################### MY SELECT COMPONENT #########################
const MySelect = ({ isMulti, tags, setTags, options }) => {
    const selectedTags = tags.map(tag => { return { label: tag.name, value: tag.name } });
  
    return (
      <CreatableSelect
        isMulti={isMulti}
        autoFocus
        onChange={evt => {
          //onChange callback (in react-select CreateableSelect component) automatically updates a selected array with: [{value: "My Tag", label: "My Tag"}]
          setTags(evt.map(el => { return { name: el.label } }));
        }}
        options={options}
        value={selectedTags}
        key={tags} //needed to get a rerender to show the tags for some reason
      />
    );
  };
  export default MySelect;

  // ###################
  // const MySelect = ({ isMulti, image, setImage, items }) => {
  //   const selectedTags = image.tags.map(tag => { return { label: tag.name, value: tag.name } });
  
  //   return (
  //     <CreatableSelect
  //       isMulti={isMulti}
  //       onChange={evt => {
  //         //onChange callback (in react-select CreateableSelect component) automatically updates a selected array with: [{value: "My Tag", label: "My Tag"}]
  //         image.tags = evt.map(el => { return { name: el.label } });
  //         setImage({ ...image });
  //       }}
  //       options={items}
  //       value={selectedTags}
  //       key={image.tags} //needed to get a rerender to show the tags for some reason
  //     />
  //   );
  // };
  // export default MySelect;