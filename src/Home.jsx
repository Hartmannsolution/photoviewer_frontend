import {useState, useEffect} from 'react';
import TagSelect from './components/TagSelect';
import config from './properties';
import utils from './utils';
import ShowImages from './components/showimages/ShowImages';

// ################### HOME ###################
const Home = () => {
  const [options, setOptions] = useState([]);
  const [tags, setTags] = useState([]);
  useEffect(()=>{
    utils.fetchAny(`${config.cloudURL}tag`, data => {
      const tags = data.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      setOptions(tags.map(tag => { return { value: tag.name, label: tag.name } })); //convert tags to options for the dropdown
    });
  }, []); 

  useEffect(()=>{
    utils.fetchAny(`${config.cloudURL}tag`, data => {
      const tags = data.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      setOptions(tags.map(tag => { return { value: tag.name, label: tag.name } })); //convert tags to options for the dropdown
    });
  }, [tags]); 

  return (
    <div>
    <h2>Photo collection site</h2>
    <p>Choose images to view based on tags</p>
      <TagSelect isMulti tags={tags} setTags={setTags} options={options} />
      <ShowImages url={config.cloudURL+"photo/"} loggedIn={false} tags={tags}/>
    </div>
  );
}

export default Home;