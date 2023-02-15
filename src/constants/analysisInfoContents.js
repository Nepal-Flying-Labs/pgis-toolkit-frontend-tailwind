export default {
  'buffer-analysis': {
    default: `<h5 class="naxatw-font-semibold">Buffer Analysis</h5>
             <p class="naxatw-text-justify naxatw-text-body-md">Buffer analysis is a technique used to create a zone or an area of a certain distance around a set of spatial features such as points, lines, or polygons. It is represented as a polygon, and it can be used to analyze and display various attributes of the features within the buffer zone.</p>
               
              <h5 class="naxatw-font-semibold ">Applications of buffer analysis:</h5>
              <ul class="naxatw-space-y-1.5 naxatw-list-disc naxatw-px-4 naxatw-text-justify">
               <li class="naxatw-text-body-md">Find the areas surrounding a specific feature, like a building, and identify other features in that area, like roads or parks.</li>
               <li class="naxatw-text-body-md">Identifying areas that are within a certain distance of a set of features, such as a set of emergency response locations, and identify other features, like hospitals or schools, that are within that area.</li>
               <li class="naxatw-text-body-md"> Assessing the environmental impact of an area, by creating buffers around a set of features, such as a pipeline or a road, and identifying the areas that are affected by that impact</li>
               <li class="naxatw-text-body-md">Identifying areas that are within a certain distance of a set of features, such as a set of emergency response locations and identifying other features, like hospitals or schools, that are within that area.</li>
               </ul>`,
    origin: `<h5 class="naxatw-font-semibold">Input Feature</h5>
              <div class="naxatw-y-1"><p class="naxatw-text-body-lg naxatw-font-semibold">Search</p><p>Search the point features within the project area for input. Input can be multiple features.</p></div>
              <div class="naxatw-y-1"><p class="naxatw-text-body-lg naxatw-font-semibold">Map</p> <p>Draw the point features on map within the project area for input.Input can be multiple features.</p></div>
              <div class="naxatw-y-1"><p class="naxatw-text-body-lg naxatw-font-semibold">Layer</p> <p>Select the features from layers uploaded under the POI theme in the data catalog for input. Input can be multiple.</p></p></div>
              <p class="naxatw-text-justify">First, you select layers from the dropdown. The attribute table of the layer selected appears in the pop-up with checkboxes. You may select a single or multiple features from the table for input.</p>`,
    bufferRadius: `
                  <h5 class="naxatw-font-semibold">Buffer Radius</h5>
                  <span class="naxatw-text-body-md">Buffer radius is the distance around the input features that will be buffered. The unit of the distance needs to be defined in metres.</span>
                  `,
    dissolveOutput: `
                  <h5 class="naxatw-font-semibold">Dissolve Output</h5>
                  <span class="naxatw-text-body-md">Specifies the type of dissolve to be performed to remove buffer overlap. The output varies on different inputs as shown in the figure below:
                  </span>
                  `,
    poi: `    <h5 class="naxatw-font-semibold">POI</h5>
               <p class="naxatw-text-body-md">On selecting the layers under POI, the final output will include the features of the selected layers filtered out by the buffer region. 
                </p>
                <div class="naxatw-space-y-1 ">
                <p class="naxatw-text-body-md naxatw-font-semibold">For example</p>
                <p class="naxatw-text-body-md">Two health posts are available within 500 metres of the buffer zone from my locality.</p>

                </div>
          </div>`,
    result: `
                 <h5 class="naxatw-font-semibold">Result</h5>
                 <span class="naxatw-text-body-md">The output buffers with the provided output name will be visible in the Results tab.
                 </span>
                
             `,
  },
};
