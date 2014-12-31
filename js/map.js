$(function(){
  /* 
   * URLs for the different warehouses
   */
  var url_al = "http://www.lcdcycle.com";
  var url_tx = "http://www.dallas.lcdcycle.com";
  var url_fl = "http://www.orlando.lcdcycle.com";
  var url_mi = "http://www.michigan.lcdcycle.com";
  
  /* 
   * List of states that correspond to each warehouse
   */
  var states_al = ['US-AL', 'US-MS', 'US-TN', 'US-GA', 'US-KY', 'US-VA', 'US-SC', 'US-NC']; 
  var states_tx = ['US-TX', 'US-LA', 'US-AR', 'US-MO', 'US-OK', 'US-KS', 'US-NE', 'US-ND',
                   'US-SD', 'US-NM', 'US-CO', 'US-WY', 'US-MT', 'US-ID', 'US-UT', 'US-AZ',
                   'US-CA', 'US-NV', 'US-OR', 'US-WA', 'US-AK', 'US-HI'];
  var states_fl = ['US-FL'];
  var states_mi = ['US-ME', 'US-NH', 'US-NY', 'US-PA', 'US-VT', 'US-MN', 'US-RI', 'US-IA', 
                   'US-DE', 'US-IN', 'US-IL', 'US-NJ', 'US-WV', 'US-MI', 'US-WI', 'US-OH', 
                   'US-MD', 'US-MA', 'US-CT'];
              
  /*
   * Warehouses and their coordinances.
   */
  var warehouse = [
    {name: 'Huntsville, AL', coords: [34.703225, -86.59317899999996], status: 'open', offsets: [0, 2]},
    {name: 'Dallas, TX', coords: [32.939127, -96.738263], status: 'open', offsets: [0, 2]},
    {name: 'Orlando, FL', coords: [28.59301,-81.356199], status: 'open', offsets: [0, 2]},
    {name: 'Howell, MI', coords: [42.5958273,-83.9335305], status: 'open', offsets: [0, 2]}
  ];
  
  /*
   * Initialize the JVectorMAp
   */
  $('#us_aea_en').vectorMap({
    map: 'us_aea_en',
    markers: warehouse.map(function(h){ return {name: h.name, latLng: h.coords} }),
    labels: {
      markers: {
        render: function(index){
          return warehouse[index].name;
        },
        offsets: function(index){
          var offset = warehouse[index]['offsets'] || [0, 0];
  
          return [offset[0] - 7, offset[1] + 3];
        }
      }
    },
    markerLabelStyle: {
      hover: {
        cursor: 'pointer',
        fill: '#DC1E27'
      },
      initial: {
        'font-family': 'Verdana',
        'font-size': '12',
        'font-weight': 'bold',
        cursor: 'default',
        fill: 'black'
      }
    },
    series: {
      markers: [{
        attribute: 'image',
        scale: {
          'open': 'img/marker.png',
        },
        values: warehouse.reduce(function(p, c, i){ p[i] = c.status; return p }, {}),
      }]
    },
    zoomButtons: false,
    backgroundColor: 'transparent',
    regionsSelectable: false,
    regionStyle: {
      initial: {
        fill: '#F6C94F'
      },
      hover: {
        "fill-opacity": 0.8,
        cursor: 'default'
      },
      selected: {
        fill: '#FCDB81'
      }
    },
    onRegionLabelShow: function(e, el, code){
      e.preventDefault();
    },
    onRegionTipShow: function(e, tip, code){
      //e.preventDefault();
    },
    onRegionClick: function(e, code){
      console.log("Clicked: " + code)
      redirect(code);
    },
    onMarkerClick: function(e, code){
      console.log("redir: " + code);
      switch(code){
        case "0": redirect("US-AL"); break;
        case "1": redirect("US-TX"); break;
        case "2": redirect("US-FL"); break;
        case "3": redirect("US-MI"); break;
      }
    },
    onMarkerOver: markerHover,
    onMarkerOut: markerOut
  });
  
  /*
   * When mouse is hovered over one of the warehouses, the map will highlight
   * states that correspond to that warehouse as determined in the state lists
   * declaration at the top.
   */
  function markerHover(e, code){
    var states;
    switch(code){
      case '0': states = states_al; break;
      case '1': states = states_tx; break;
      case '2': states = states_fl; break;
      case '3': states = states_mi; break;
    }
    
    var mapObj = $('#us_aea_en').vectorMap('get', 'mapObject');
    mapObj.setSelectedRegions(states);
  }
  
  /*
   * Clear any selected states after the mouse leaves a marker
   */
  function markerOut(e, code){
    var mapObj = $('#us_aea_en').vectorMap('get', 'mapObject');
    mapObj.clearSelectedRegions();
  }
  
  /*
   * Compares the state code param against the arrays of warehouse-associated
   * states. Redirects the browser to the proper warehouse website.
   */
  function redirect(state){
    var index = -1;
    
    setCookie("warehouse_selection", state, 365);
    
    //check for al warehouse states
    index = indexOf.call(states_al, state);
    if(index > -1){
      window.location.href = url_al;
    }
    
    //check for tx warehouse states
    index = indexOf.call(states_tx, state);
    if(index > -1){
      window.location.href = url_tx;
    }
    
    //check for fl warehouse states
    index = indexOf.call(states_fl, state);
    if(index > -1){
      window.location.href = url_fl;
    }
    
    //check for mi warehouse states
    index = indexOf.call(states_mi, state);
    if(index > -1){
      window.location.href = url_mi;
    }
  }
  
  /*
   * Helper function for searching arrays
   */
  var indexOf = function(needle) {
    if(typeof Array.prototype.indexOf === 'function') {
      indexOf = Array.prototype.indexOf;
    } else {
      indexOf = function(needle) {
        var i = -1, index = -1;

        for(i = 0; i < this.length; i++) {
          if(this[i] === needle) {
            index = i;
            break;
          }
        }

        return index;
      };
    }
    return indexOf.call(this, needle);
  };
  
  /*
   * Show/hide controls for the selection div.
   */
  $('#selection').hide();
   
  $('button').click(function(){
    var val = $(this).val();
    switch(val){
      case "yes":
        redirect("US-AL");
        break;
      case "no": 
        $('#question').hide();
        $('#selection').show();
        break;
    }
  });
});