export interface Response {
    responseCode: number,
    requestId: number,
    avm: number,
    minAvm: number,
    maxAvm: number,
    rentalAVM: number,
    minRentalAVM: number,
    maxRentalAVM: number,
    propertytype: string,
    tenure: string,
    yearBuilt: number,
    bedrooms: number,
    commentary: string
}