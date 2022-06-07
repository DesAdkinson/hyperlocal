/* Extract required values from the SOAP response and return a JSON string */
function processResponse(res) {

    //Pull out the returned values - no DOM//SAX parsing here - just a bunch of string manupulation...
    var responseCode_value = processElement(res, "responseCode");  
    var requestId_value = processElement(res, "requestId");
    var avm_value = processElement(res, "avm");
    var minAvm_value = processElement(res, "minAvm");
    var maxAvm_value = processElement(res, "maxAvm");
    var rentalAVM_value = processElement(res, "rentalAVM");
    var minRentalAVM_value = processElement(res, "minRentalAVM");
    var maxRentalAVM_value = processElement(res, "maxRentalAVM");
    var propertytype_value = processElement(res, "propertytype");
    var tenure_value = processElement(res, "tenure");
    var yearBuilt_value = processElement(res, "yearBuilt");
    var bedrooms_value = processElement(res, "bedrooms");
    var commentary_value = processElement(res, "commentary");
      
    //Assemble retrieved values into a JSON string
    var res_json = '{"requestId" : ' + requestId_value + ', ';
    res_json += '"avm" : ' + avm_value + ', ';
    res_json += '"minAvm" : ' + minAvm_value + ', ';
    res_json += '"maxAvm" : ' + maxAvm_value + ', ';
    res_json += '"rentalAVM" : ' + rentalAVM_value + ', ';
    res_json += '"minRentalAVM" : ' + minRentalAVM_value + ', ';
    res_json += '"maxRentalAVM" : ' + maxRentalAVM_value + ', ';
    res_json += '"propertytype" : ' + JSON.stringify(propertytype_value) + ', ';
    res_json += '"tenure" : ' + JSON.stringify(tenure_value) + ', ';
    res_json += '"yearBuilt" : ' + yearBuilt_value + ', ';
    res_json += '"bedrooms" : ' + bedrooms_value + ', ';
    res_json += '"responseCode" : ' + responseCode_value + ', ';
    res_json += '"commentary" : ' + JSON.stringify(commentary_value);
    res_json += '}';
  
    return res_json
  }
  
  /* Extract a single value from the SOAP response based on a supplied element name */
  function processElement(res, element_name) {
  
 /* determine if the element name exists in the response */
    var element_loc = res.indexOf(element_name);

    if (element_loc < 0) {
      return '""' //optional element not present
    } else {

   /* assign the characters beyond the close bracket to a new variable, element_plus: */
      var element_plus = res.substring(element_loc + element_name.length + 1);
    
   /* use indexOf() again, to search for a new instance of element_name
      which we expect to be the closing tag for the element */
      var close_element_loc = element_plus.indexOf(element_name);
    
   /* given the location of the closing tag, we can now use substring() to extract
      the data contained within the element */
      return element_plus.substring(0, close_element_loc - 2);
    }
  }
  
  module.exports = {processResponse}