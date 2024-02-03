export const validateFormInput = (name, value) => {
  switch (name) {
    // case "full_name": {
    //   if (value?.length === 0) {
    //     return "Fullname is required";
    //   } else if (!value?.trim().match(/^[A-Za-z ]+$/)) {
    //     return "Invalid Fullname";
    //   } else {
    //     return "";
    //   }
    // }
    case "first_name": {
      if (value?.length === 0) {
        return "Firstname is required";
      } else if (!value?.trim().match(/^[A-Za-z ]+$/)) {
        return "Invalid Firstname";
      } else {
        return "";
      }
    }
    case "Gender": {
      if (value?.length === 0) {
        return "Gender is required";
      } else {
        return "";
      }
    }
    case "DOB": {
      if (value?.length === 0) {
        return "DOB is required";
      } else {
        return "";
      }
    }
    case "Pincode": {
      if (value?.length === 0) {
        return "Pincode should contain only numbers";
      } else {
        return "";
      }
    }
    case "address": {
      if (value?.length === 0) {
        return "Address is required";
      } else {
        return "";
      }
    }
    case "state": {
      if (value?.length === 0) {
        return "State is required";
      } else {
        return "";
      }
    }
    case "city": {
      if (value?.length === 0) {
        return "City is required";
      } else {
        return "";
      }
    }
    case "country": {
      if (value?.length === 0) {
        return "Country is required";
      } else {
        return "";
      }
    }
    case "InterpreterterNeeded": {
      if (value?.length === 0) {
        return "Interpreter is required";
      } else {
        return "";
      }
    }
    case "AvaibilityForOnCallDuties": {
      if (value?.length === 0) {
        return "Avaibility for on call duties is required";
      } else {
        return "";
      }
    }
    case "languageProficiency": {
      if (value?.length === 0) {
        return "language proficiency is required";
      } else {
        return "";
      }
    }
    case "preferredMethodOfCommunication": {
      if (value?.length === 0) {
        return "preferred method of communication is required";
      } else {
        return "";
      }
    }
    case "MedicalDegree1": {
      if (value?.length === 0 || null) {
        return "Medical degree is required";
      } else {
        return "";
      }
    }
    case "Speciality1": {
      if (value?.length === 0 || null) {
        return "Speciality1 is required";
      } else {
        return "";
      }
    }
    case "MedicalLicenceNumber": {
      if (value?.length === 0 || null) {
        return "Medical licence number is required";
      } else {
        return "";
      }
    }
    case "BoardCertificate1": {
      if (value?.length === 0 || null) {
        return "Board certificate1 is required";
      } else {
        return "";
      }
    }
    case "NPInumber": {
      if (value?.length === 0 || null) {
        return "NPI number is required";
      } else {
        return "";
      }
    }
    case "ProfessionalMembershipAndAffiliations": {
      if (value?.length === 0 || null) {
        return "Professional membership and affiliations is required";
      } else {
        return "";
      }
    }
    case "MedicalDegree2": {
      if (value?.length === 0 || null) {
        return "Medical degree2 is required";
      } else {
        return "";
      }
    }
    case "BoardCertificate2": {
      if (value?.length === 0 || null) {
        return "Board certificate2 is required";
      } else {
        return "";
      }
    }
    case "medicalSchool": {
      if (value?.length === 0) {
        return "medical school is required";
      } else {
        return "";
      }
    }
    case "TrainingProgramCompleted": {
      if (value?.length === 0) {
        return "Training program completed is required";
      } else {
        return "";
      }
    }
    case "uploadDegree": {
      if (value?.length === 0) {
        return "upload degree is required";
      } else {
        return "";
      }
    }
    case "CME": {
      if (value?.length === 0) {
        return "CME is required";
      } else {
        return "";
      }
    }
    case "uploadTrainingCertificate": {
      if (value?.length === 0) {
        return "upload training certificate is required";
      } else {
        return "";
      }
    }
    case "previousEmployement": {
      if (value?.length === 0) {
        return "previous employement is required";
      } else {
        return "";
      }
    }
    case "previousPosition": {
      if (value?.length === 0) {
        return "previous position is required";
      } else {
        return "";
      }
    }
    case "privileges": {
      if (value?.length === 0) {
        return "privileges is required";
      } else {
        return "";
      }
    }
    case "Department": {
      if (value?.length === 0) {
        return "Department is required";
      } else {
        return "";
      }
    }
    case "hospitalAffiliations": {
      if (value?.length === 0) {
        return "hospital affiliations is required";
      } else {
        return "";
      }
    }
    case "AadharCard": {
      if (value?.length === 0) {
        return "Aadhar card is required";
      } else {
        return "";
      }
    }
    case "panCard": {
      if (value?.length === 0) {
        return "pan card is required";
      } else {
        return "";
      }
    }
    case "insuranceDocument": {
      if (value?.length === 0) {
        return "insurance document is required";
      } else {
        return "";
      }
    }
    case "insuranceNumber": {
      if (value?.length === 0) {
        return "insurance number is required";
      } else {
        return "";
      }
    }
    case "BankAccountNumber": {
      if (value?.length === 0) {
        return "Bank account number is required";
      } else {
        return "";
      }
    }
    case "confirmAccountNumber": {
      if (value?.length === 0) {
        return "confirm account number is required";
      } else {
        return "";
      }
    }
    case "IFSCCOde": {
      if (value?.length === 0) {
        return "IFSC cOde is required";
      } else {
        return "";
      }
    }
    case "AccountHolderName": {
      if (value?.length === 0) {
        return "Account holder name is required";
      } else {
        return "";
      }
    }
    
    case "CriminalHistory": {
      if (value?.length === 0) {
        return "Criminal history is required";
      } else {
        return "";
      }
    }
    case "DisciplinaryActions": {
      if (value?.length === 0) {
        return "Disciplinary actions is required";
      } else {
        return "";
      }
    }
    case "CriminalReason": {
      if (value?.length === 0) {
        return "Criminal reason is required";
      } else {
        return "";
      }
    }
    case "DisciplinaryReasons": {
      if (value?.length === 0) {
        return "Disciplinary reasons is required";
      } else {
        return "";
      }
    }
    case "ConsentToReleaseMedicalInformation": {
      if (value?.length === 0 || null) {
        return "Consent to release medical information is required";
      } else {
        return "";
      }
    }
    case "AcknowledgeOfCompliance": {
      if (value?.length === 0) {
        return "Acknowledge of compliance is required";
      } else {
        return "";
      }
    }
    case "signature": {
      if (value?.length === 0) {
        return "signature is required";
      } else {
        return "";
      }
    }
    case "AcceptTermsCondetion": {
      if (value?.length === 0) {
        return "Accept terms condetion is required";
      } else {
        return "";
      }
    }
    case "last_name": {
      if (value?.length === 0) {
        return "Lastname is required";
      } else if (!value?.trim().match(/^[A-Za-z ]+$/)) {
        return "Invalid Lastname";
      } else {
        return "";
      }
    }
    case "email": {
      if (value?.length == 0) {
        return "Email is required";
      } else if (
        !value
          ?.toLowerCase()
          .trim()
          .match(/^(?!.*\.\@)(?!.*\.\.)[\w.-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/)
      ) {
        return "Invalid Email Address";
      } else {
        return "";
      }
    }
    case "password": {
      if (value.length === 0) {
        return "Password is required";
      } else if (
        !value?.match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[a-zA-Z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/
        )
      ) {
        return "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one special character and one number";
      } else {
        return "";
      }
    }
    // case "role": {
    //   if (value?.length == 0 || value == undefined) {
    //     return "Role is required";
    //   } else {
    //     return "";
    //   }
    // }
    // case "locale": {
    //   if (value?.length == 0 || value == undefined) {
    //     return "Locale is required";
    //   } else {
    //     return "";
    //   }
    // }
    // case "timezone": {
    //   if (value?.length == 0 || value == undefined) {
    //     return "Timezone is required";
    //   } else {
    //     return "";
    //   }
    // }
    // case "companyBased": {
    //   if (value?.length == 0 || value == undefined) {
    //     return "Company Based is required";
    //   } else {
    //     return "";
    //   }
    // }
    // case "organization_name": {
    //   if (value?.length == 0 || value == undefined) {
    //     return "Organization Name is required";
    //   } else {
    //     return "";
    //   }
    // }
    // case "companyUrl": {
    //   if (value.length == 0) {
    //     return "Company Url is required";
    //   } else if (
    //     !value
    //       ?.trim()
    //       .match(
    //         /^(https?:\/\/)?([a-zA-Z0-9]+([a-zA-Z0-9\-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(\/[^\/\.]+)*\/?$/
    //       )
    //   ) {
    //     return "Invalid Company Url";
    //   } else {
    //     return "";
    //   }
    // }
    case "contact_no": {
      if (value?.length == 0) {
        return "Contact No. is required";
      } else if (
        !value?.match(/^[+]?[0-9]+([-][0-9]+)*$/) ||
        !(value.length >= 10 && value.length <= 15)
      ) {
        return "Contact No. should have at least 10 digits and contains digits only.";
      } else {
        return "";
      }
    }
    // case "house_no": {
    //   if (value?.length == 0) {
    //     return "House No. is required";
    //   } else {
    //     return "";
    //   }
    // }
    // case "postal_code": {
    //   if (value?.length == 0) {
    //     return "Postal code is required";
    //   } else if (
    //     !value?.match(/^[0-9+]+$/) ||
    //     !(value.length == 6 && value.length <= 15)
    //   ) {
    //     return "Postal code should have 6 digits only.";
    //   } else {
    //     return "";
    //   }
    // }
    default: {
      if (value?.length === 0) {
        return `${name} is required`;
      } else {
        return "";
      }
    }
  }
};