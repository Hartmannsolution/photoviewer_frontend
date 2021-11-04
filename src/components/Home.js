const desc = [
    {'id':1,'title':'Book Tiles','description':'Show cases the easy way to use Bootstrap Card component to show entities as Cards rather than table rows. Using bootstrap: npm install react-bootstrap@next bootstrap@5.1.1 and import as seen in components/BookTiles.js','link':'/booktiles'},
    {'id':2,'title':'Accordion Demo','description':'Shows how to use bootstrap accordion component with image and link (For some reason the image from placeholder does not show. Instead another static image is shown.','link':'/accordion'},
    {'id':3,'title':'Pagination Demo','description':'Pagination Demo uses the local jsonserver to serve up 2000 person records (remember to start the server with npm run postbackend before using the pagination tab). Shows examples of: conditional rendering, bootstrap table with stripes, useEffect with observer','link':'/pagination'},
    {'id':4,'title':'Bootstrap Controls Demo ','description':'Show cases several different components from bootstrap','link':'/controls'},
    {'id':5,'title':'Breadcrumbs and bottons','description':'sub route under /controls. Shows how to use the hool: useLocation() to get the url and transform it to interactive bread crumbs. Additionally shows severeal bootstrap buttons','link':'/controls/buttons'},
    {'id':6,'title':'Carousel','description':'Shows how to use bootstrap Carousel to show images. Also shows how to use images in 3 ways: import, require("location").default, and with web url','link':'/controls/carousel'},
    {'id':7,'title':'Forms','description':'Shows how to use the many different bootstrap form elements','link':'/controls/forms'},
    {'id':8,'title':'Modal','description':'Shows how to use different types of bootstrap modals. Including a Form modal','link':'/controls/modals'},
    {'id':9,'title':'Flip Cards','description':'Use of only CSS to show flip cards','link':'/controls/flipCards'}
    // {'id':4,'title':'','description':'','link':'/'},
];
export default (props) => {
    return (<>
    <ul>
        {desc.map((bullet,idx)=>{
            return (
                <li key={idx}>
                <h3>{bullet.title}</h3>
                <p>{bullet.description}</p>
                {/* added /react2021fall before the relative link is needed when deploying the solution to nginx */}
                <b><a href={`/react2021fall${bullet.link}`}>Show me</a></b>
                </li>
            );
        })}
    </ul>
    </>);

};