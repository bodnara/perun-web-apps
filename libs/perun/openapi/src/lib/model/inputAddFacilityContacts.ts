/**
 * Perun RPC API
 * Perun Remote Procedure Calls Application Programming Interface
 *
 * The version of the OpenAPI document: 3.21.0
 * Contact: perun@cesnet.cz
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { ContactGroup } from './contactGroup';


/**
 * input to addFacilityContacts
 */
export interface InputAddFacilityContacts { 
    contactGroupsToAdd: Array<ContactGroup>;
}

