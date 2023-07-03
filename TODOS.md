### ISSUES

<!-- - [ ] icon grey -->
<!-- - [ ] responsive project header (long project name) -->
<!-- - [ ] token session expire (session expire toast) -->

### FEATURES

- [x] hand icon while edit hover
- [ ] boundary zindex least (hold)
- [ ] label in map (raj)

- [x] data query value search (sudeep)
- [x] data input in summary poi in selected poi (need & )
- [x] In alternative route input, UI redesign (+, -) (sudeep)
- [x] popup image view (sudeep) (style of download button in lightbox)
- [ ] dropdown option transition (sudeep)
- [x] x/y label bold in chart (sudeep )
- [x] attribute table on less data design (ward 1 ditch layer /sudeep)
- [x] zoom to feature on attr table (sudeep)
- [ ] scroll to input field for validation (research/sudeep)
- [x] handle date data format (component wise) in all section
- [ ] format date/time in all sections (table etc) (sudeep)(hold)
- [ ] Implement User Permission and role (individual button needs to be reviewed) (sudeep)
- [x] popup text size reduce (sudeep)
- [x] data query api integration (sudeep)

- [ ] download layer not working (raj)

### ISSUES

- [ ] Check error text review (data cleaning)
- [ ] After data upload is successful, repeatative toast message is shown (hold)
- [ ] Cross icon for processing execution
- [ ] Project Boundary line color not displaying on map.

### ROUTE ANALYSIS

- [x] geometry type polygon after route layer save
- [ ] route to data cleaning on reload
- [ ] go back to step one from two.. in data cleaning
- [ ] zoom to feature after select in osm search (discussion)

### MANUAL FIX

- [x] explode delete => multipart still remain (raj) => (remove from all other list)
- [ ] snap to self while edit
- [ ] copy helpbox from buffer analysis save to start
- [ ] add icon drag feature to add feature
- [ ] layer sync after data cleaning (raj)

- [ ] show vertex while editing
- [ ] show popup for feature

### ISSUES 24 FEB

- [ ] source => dropdown => other organizations(specify) | primary/secondary (upen dai)

- [x] buffer analysis => select layer only, implement result window (backend needs to be implemented)

### ISSUES WBR

- [ ] disable auto/manual fix btn while fixing errors
- [ ] add feature refactor
- [ ] bookmark zoom extent
- [ ] 5.8 zoom to selected layer choice? highlight query results yellow?
- [ ] cancel layer upload?

- [ ] movable popup? (feature request/hold)

- [ ] upload your datasets additional menu => (upen dai/hold)

- [ ] issue on draw tool (drag and add feature)
- [ ] undo issue, redo?

- [ ] feat: give point name while drawing (next phase)

<!-- - [ ] Clicking on "Visualize" does not do anything? -->

### NEW TASKS

- [ ] bbox negative (raj) [https://pgis.naxa.com.np/api/maps/project_theme_layers/?theme=640]
- [ ] start point click auto save (analysis origin point input)

- [ ] undo/redo button manual fix

- [ ] feature highlight issue multipart

### DESIGN REVIEW

- [x] project map => line seperator in map and sidebar
- [x] button sm padding
- [x] accordion content padding
- [x] project header
- [x] border in toolbar
- [ ] font issue in safari
- [x] airbnb reference map/sidebar
- [x] scrollbar on hover => ref =>slack
- [ ] analysis modal design
- [ ] drop shadow
- [ ] center align save button edit sidebar section
- [ ] google earth reference
- [x] organization map card design => fix height
- [x] clear button on search

### PROJECT MAP
- [ ] layer category sorting issue in map sidebar
- [ ] project clustering bbox issue
- [ ] download layer name issue

### DESIGN
- [ ] layer order accordion border color
- [ ] dropdown options in modal/table

- [ ] test branch -> test/refactor-analysis-module


## TASKS (MAY 11)
- [ ] move create analysis modal after data cleaning for optimal route 
- [ ] route for analysis page (id from params)

### NEW TASKS
- [x] accordion options click toggle accordion
- [ ] obstacles not fetching in analysis preview
- [ ] reset analysis state on unmount
- [ ] done button in analysis header
- [ ] starting/end point z-index
- [ ] loader while fetching individual analysis result

- [ ] analysis list dropdown options edit/delete functionality
- [ ] download analysis
- [ ] delete analysis
- [ ] implement api search in analysis list (raj)
- [ ] implement pagination in analysis list

### ISSUES
- [ ] zoom to selected road on initial load not working
- [ ] dropdown option hide issue

- [x] user upload GEOJSON
- [ ] optimal route analysis message

- [x] radius column
- [x] show manage attribute on layer add
- [x] arrow scroll to bottom in analysis sidebar 
- [ ] scale select option in map export section 

- [x] highlight query result layer (increase border with opacity low)
- [x] buffer analysis showing only poi layers in origin layer selection
- [x] scroll to error field in sidebar analysis
- [x] obstacles not showing in route analysis
- [ ] delete proximity error on first run
- [ ] buffer analysis result zooming to ocean in production
- [ ] toggle data input selected layer for toggle 
- [ ] osm search working/not working

### URGENT
- [ ] data cleaning state (raj)
- [ ] check log for the first time
- [ ] reset = true button
