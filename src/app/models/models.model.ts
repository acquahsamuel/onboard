import {
  ICustomerInfo,
  IBreachDetails,
  IRecordDetails
} from "../interface/types";


/**
 * Employment details
 */
export class EmploymentInfo implements ICustomerInfo {
  cif?: string;
  nameOfCounterparty?: string;
  rm?: string;
  managerId?: string;
  portfolioCode?: string;
  counterpartyCIF?: string;
  counterpartyGroupName?: string;
}


/**
 * Breach Details
 */
export class BreachInfo implements IBreachDetails {
  breachStatus?: string;
  proposal?: string;
  breachDecision?: string;
  decisionTaker?: string;
  actionDate?: string;
  followUpDate?: string;
  breachExtraDays?: 0;
  // notify?: string;
}


/**
 * Records class implement
 */
export class RecordInfo implements IRecordDetails {
  suite?: string;
  frequency?: string;
  timeAllowed?: 0;
  expirydate?: string;
  nextDue?: string;
  monRequirement?: string;
  currency?: string;
  ratioName?: string;
  covDetails?: string;
  comments?: string;
  notify?: string;
}
