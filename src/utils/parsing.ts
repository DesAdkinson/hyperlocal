/* Extract required values from the XML SOAP response ('res') and return a JS object
   matching the interface Response */
function processResponse(res) {

    //Pull out the returned values - no DOM//SAX parsing here - just a bunch of string manupulation...
    let responseCode_value = parseInt(processElement(res, "responseCode"));  
    let requestId_value = parseInt(processElement(res, "requestId"));
    let avm_value = parseInt(processElement(res, "avm"));
    let minAvm_value = parseInt(processElement(res, "minAvm"));
    let maxAvm_value = parseInt(processElement(res, "maxAvm"));
    let rentalAVM_value = parseInt(processElement(res, "rentalAVM"));
    let minRentalAVM_value = parseInt(processElement(res, "minRentalAVM"));
    let maxRentalAVM_value = parseInt(processElement(res, "maxRentalAVM"));
    let propertytype_value = processElement(res, "propertytype");
    let tenure_value = processElement(res, "tenure");
    let yearBuilt_value = parseInt(processElement(res, "yearBuilt"));
    let bedrooms_value = parseInt(processElement(res, "bedrooms"));
    let commentary_value = processElement(res, "commentary");
  
    let res_obj = {
      requestId: requestId_value,
      avm: avm_value,
      minAvm: minAvm_value,
      maxAvm: maxAvm_value,
      rentalAVM: rentalAVM_value,
      minRentalAVM: minRentalAVM_value,
      maxRentalAVM: maxRentalAVM_value,
      propertytype: propertytype_value,
      tenure: tenure_value,
      yearBuilt: yearBuilt_value,
      bedrooms: bedrooms_value,
      responseCode: responseCode_value,
      commentary: commentary_value
    }

    return res_obj
  }
  
  /* Extract a single value from the SOAP response based on a supplied element name */
  function processElement(res, element_name) {
  
 /* determine if the element name exists in the response */
    let element_loc = res.indexOf(element_name);

    if (element_loc < 0) {
      return '""' //optional element not present
    } else {

   /* assign the characters beyond the close bracket to a new variable, element_plus: */
      let element_plus = res.substring(element_loc + element_name.length + 1);
    
   /* use indexOf() again, to search for a new instance of element_name
      which we expect to be the closing tag for the element */
      let close_element_loc = element_plus.indexOf(element_name);
    
   /* given the location of the closing tag, we can now use substring() to extract
      the data contained within the element */
      return element_plus.substring(0, close_element_loc - 2);
    }
  }
  
module.exports.processResponse = processResponse;