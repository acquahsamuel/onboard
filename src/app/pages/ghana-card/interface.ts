export interface CLIENTDATA {
  cardNo: string;
  email: string;
  primaryPhone: string;
  secondaryPhone: string;
  digitalAddress: string;
  postalAddress: string;
  physicalAddress: string;
  frontImage: string;
  backImage: string;
  acc: string;
  status: "APPROVED" | "PENDING" | "REJECTED";
  reason: string;
  transId: string;
  approverStaffNo: string;
  approverComments: string;
  approvedDate: string;
  requestDate: string;
  fullname: string;
}

export interface GhanaCardDataResponse {
  headerResponse: HeaderResponse;
  totalRecords: number;
  dataList: CLIENTDATA[];
}

// interface DataList {
//   cardNo: string;
//   email: string;
//   primaryPhone: string;
//   secondaryPhone: string;
//   digitalAddress: string;
//   postalAddress: string;
//   physicalAddress: string;
//   frontImage: string;
//   backImage: string;
//   acc: string;
//   status: string;
//   approverStaffNo: string;
//   approverComments: string;
//   approvedDate: string;
//   requestDate: string;
// }

interface HeaderResponse {
  sourceCode: string;
  requestId: string;
  countryCode: string;
  responseCode: string;
  responseMessage: string;
}
