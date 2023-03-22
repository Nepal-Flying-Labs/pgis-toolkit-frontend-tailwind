const { MEDIA_URL } = process.env;

export default {
  'buffer-analysis': {
    default: `<h5 class="naxatw-font-semibold">Buffer Analysis</h5>
             <p class="naxatw-text-justify ">Buffer analysis is a technique used to create a zone or an area of a certain distance around a set of spatial features such as points, lines, or polygons. It is represented as a polygon, and it can be used to analyze and display various attributes of the features within the buffer zone.</p>
               
              <h5 class="naxatw-font-semibold ">Applications of buffer analysis:</h5>
              <ul class="naxatw-space-y-1.5 naxatw-list-disc naxatw-px-4 naxatw-text-justify">
               <li class="">Find the areas surrounding a specific feature, like a building, and identify other features in that area, like roads or parks.</li>
               <li class="">Identifying areas that are within a certain distance of a set of features, such as a set of emergency response locations, and identify other features, like hospitals or schools, that are within that area.</li>
               <li class=""> Assessing the environmental impact of an area, by creating buffers around a set of features, such as a pipeline or a road, and identifying the areas that are affected by that impact</li>
               <li class="">Identifying areas that are within a certain distance of a set of features, such as a set of emergency response locations and identifying other features, like hospitals or schools, that are within that area.</li>
               </ul>`,
    origin: `<h5 class="naxatw-font-semibold">Input Feature</h5>
              <div class="naxatw-y-1"><p class=" naxatw-font-semibold">Search</p><p>Search the point features within the project area for input. Input can be multiple features.</p></div>
              <div class="naxatw-y-1"><p class=" naxatw-font-semibold">Map</p> <p>Draw the point features on map within the project area for input.Input can be multiple features.</p></div>
              <div class="naxatw-y-1"><p class=" naxatw-font-semibold">Layer</p> <p>Select the features from layers uploaded under the POI theme in the data catalog for input. Input can be multiple.</p></p></div>
              <p class="naxatw-text-justify">First, you select layers from the dropdown. The attribute table of the layer selected appears in the pop-up with checkboxes. You may select a single or multiple features from the table for input.</p>`,
    bufferRadius: `
                  <h5 class="naxatw-font-semibold">Buffer Radius</h5>
                  <p class="">Buffer radius is the distance around the input features that will be buffered.The unit of the distance could be chosen by the user from the dropdown options (Meter, Kilometer).</p>
                  `,
    dissolveOutput: `
                  <h5 class="naxatw-font-semibold">Dissolve Output</h5>
                  <p class="">Specifies the type of dissolve to be performed to remove buffer overlap. The output varies on different inputs as shown in the figure below:
                  </p>
                  <img src="${MEDIA_URL}dissolve_output.png"/>
                  `,
    poi: `    <h5 class="naxatw-font-semibold">POI</h5>
               <p class="">On selecting the layers under POI, the final output will include the features of the selected layers filtered out by the buffer region. 
                </p>
                <div class="naxatw-space-y-1 ">
                <p class=" naxatw-font-semibold">For example</p>
                <p class="">Two health posts are available within 500 metres of the buffer zone from my locality.</p>

                </div>
          </div>`,
    result: `
                 <h5 class="naxatw-font-semibold">Result</h5>
                 <p class="">The output buffers with the provided output name will be visible in the Results tab.
                 </p>
                
             `,
  },
  'proximity-analysis': {
    default: `<h5 class="naxatw-font-semibold">Proximity Analysis</h5>
             <p class="naxatw-text-justify ">Proximity analysis is a geographic information system (GIS) technique used to identify and analyze spatial relationships between different features or objects within a given area. It involves measuring the distance or proximity between various geographic features, such as buildings, roads, rivers, and other land-use elements.
             </p>
             <p class="naxatw-text-justify naxatw-font-bold">Example</p>
             <p class="naxatw-text-justify ">
             How many school are located within a 500 meter radius of a city center?             
             </p>
             <img src="${MEDIA_URL}proximity_analysis.png"/>
             `,
    origin: `<h5 class="naxatw-font-semibold">Input Feature</h5>
              <div class="naxatw-y-1"><p class=" naxatw-font-semibold">Search</p><p> Search the point features within the project area for input. Input can be multiple features.</p></div>
              <div class="naxatw-y-1"><p class=" naxatw-font-semibold">Map</p> <p>Draw the point features on map within the project area for input.Input can be multiple features.</p></div>
              <div class="naxatw-y-1"><p class=" naxatw-font-semibold">Layer</p> <p> Select the features from layers uploaded under the POI theme in the data catalog for input. Input can be multiple.</p></p></div>
              <p class="naxatw-text-justify">First, you select layers from the dropdown. The attribute table of the layer selected appears in the pop-up with checkboxes. You may select a single or multiple features from the table for input.</p>`,
    bufferRadius: `
                  <h5 class="naxatw-font-semibold">Proximity Radius</h5>
                  <p class="">Proximity radius is the distance around the input features that will be buffered.The unit of the distance could be chosen by the user from the dropdown options (Meter, Kilometer).</p>
                  `,
    dissolveOutput: `
                  <h5 class="naxatw-font-semibold">Dissolve Output</h5>
                  <p class="">Specifies the type of dissolve to be performed to remove buffer overlap. The output varies on different inputs as shown in the figure below:
                  </p>
                  <img src="${MEDIA_URL}dissolve_output.png" />
                  `,
    poi: `    <h5 class="naxatw-font-semibold">POI</h5>
               <p class="">On selecting the layers under POI, the final output will include the features of the selected layers filtered out by the buffer region. 
                </p>
                <div class="naxatw-space-y-1 ">
                <p class=" naxatw-font-semibold">For example</p>
                <p class="">Two health posts are available within 500 metres of the buffer zone from my locality.</p>

                </div>
          </div>`,
    result: `
                 <h5 class="naxatw-font-semibold">Result</h5>
                 <p class="">The output buffers with the provided output name will be visible in the Results tab.
                 </p>
                
             `,
  },
  'optimal-route': {
    default: `<h5 class="naxatw-font-semibold">Optimal Route Analysis</h5>
             <p class="naxatw-text-justify ">Optimal route analysis is used to determine the most efficient or cost-effective route for a particular set of conditions. This includes finding the shortest distance between two locations, determining the best route for avoiding certain obstacles or areas, or minimizing the overall cost of a trip.
             </p>
             <img src="${MEDIA_URL}optimal_route_GsbbWHT.png" />
             `,
    modeOfTransport: `<h5 class="naxatw-font-semibold">Mode of transport</h5>
             <div class="naxatw-y-1"><p class=" naxatw-font-semibold">Search</p><p>You may select the different modes of transportation and obtain different routes based on selected modes.
             </p></div>`,

    origin: `<h5 class="naxatw-font-semibold">Origin & Destination Point</h5>
              <div class="naxatw-y-1"><p class=" naxatw-font-semibold">Origin Point</p><p>The point from where you want to start the route is the origin point.</p></div>
              <div class="naxatw-y-1"><p class=" naxatw-font-semibold">Destination Point</p> <p>The point where the route ends is the destination point.</p></div>
              <div class="naxatw-y-1"><p class=" "> <p> USAFIRI allows you to search, select and map the origin and destination points.</p></p></div>
              <div class="naxatw-y-1"><p class=" naxatw-font-semibold">Search</p><p>Search the point feature within the project area for input of origin and destination point. It inputs only a single origin and destination point.</p></div>
              <div class="naxatw-y-1"><p class=" naxatw-font-semibold">Map</p><p>Draw the destination point feature on map within the project area for input. It inputs only a single destination point.</p></div>
              <div class="naxatw-y-1"><p class=" naxatw-font-semibold">Layer</p><p>Select a feature from layers uploaded under the POI theme in the data catalog for input. It inputs only a single origin point.</p></div>
              
              `,

    obstacle: `<h5 class="naxatw-font-semibold">Obstacles</h5>
                  <div class="naxatw-y-1">It is a specific point of interest, an emergency response location, or a restricted zone that impacts the travel along a specific route.</p></div>
                  <div class="naxatw-y-1"><p>Use of obstacle in optimal route analysis:</p></div>

                  <ul class="naxatw-space-y-1.5 naxatw-list-disc naxatw-px-4 naxatw-text-justify">
                  <li class=""> Determine the best route by avoiding or minimizing the impact of the point feature obstacles.</li>
                  <li class="">Identify areas that are not passable or not safe due to the point feature obstacles and avoid those areas in the route calculation</li>
                  <li class="">Model additional constraints like safety, security, or emergency management.</li>
                  <li class="">Visualize the impact of the point feature obstacles on the route</li>
                  </ul>`,
  },
};
