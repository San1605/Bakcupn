import * as Yup from 'yup';

export const addLPSchema = Yup.object().shape({
  lpName: Yup.string().required('Department Name is required'),
  NoOfCourses: Yup.number()
    .typeError('Number of courses must be a number')
    .positive('Number of courses must be a positive number')
    .integer('Number of courses must be an integer')
    .required('Number of courses is required'),
  technology: Yup.string().typeError('Technology must be a string').required('Technology is required'),
});




export const addCourseSchema = Yup.object().shape({
  courseSequence: Yup.number()
    .typeError('Course Sequence must be a number')
    .positive('Course Sequence must be a positive number')
    .integer('Course Sequence must be an integer')
    .required('Course Sequence is required'),
  Description: Yup.string().required('Description is required'),
  complexity: Yup.string().required('Complexity is required'),
  uploadDocument: Yup.mixed()
    .test('fileSize', 'File size is too large. Maximum size is 5 MB', (value) => {
      if (!value) return true; // No file is fine
      return value.size <= 5242880; // 5 MB
    })
    .test('fileType', 'Unsupported file type', (value) => {
      if (!value) return true; // No file is fine
      return ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'].includes(value.type);
    })
    .required('Upload Document is required'),
});



export const addCollegeSchema = Yup.object().shape({
  CollegeName: Yup.string().required('College Name is required'),
  TpoHeadName: Yup.string().required('TPO Head Name is required'),
  TpoContactNo: Yup.number()
    .typeError('TPO Contact No. must be a number')
    .positive('TPO Contact No. must be a positive number')
    .integer('TPO Contact No. must be an integer')
    .required('TPO Contact No. is required')
    .test(
      'len',
      'TPO Contact No. must be exactly 10 digits',
      (val) => val && val.toString().length === 10
    ),
  TpoEmailId: Yup.string().email('Invalid email').required('TPO Email ID is required'),
  // Domains: Yup.string().required('Domains are required'),
  address: Yup.string().required('Address is required'),
  StartDate: Yup.date().required('Start Date is required'),
  endDate: Yup.date()
    .min(Yup.ref('StartDate'), 'End Date must be after Start Date')
    .required('End Date is required'),

  collegeLogo: Yup.mixed()
    .test('required', 'College Logo is required', (value) => value && Object.keys(value).length > 0)
    .test('fileSize', 'File size is too large. Maximum size is 5 MB', (value) => {
      if (!value) return true; // No file is fine
      return value.size <= 5242880; // 5 MB
    })
    .test('fileType', 'Unsupported file type', (value) => {
      if (!value) return true; // No file is fine
      return ['image/jpeg', 'image/png'].includes(value.type);
    })
  ,
  CollegeMou: Yup.mixed()
    .test('required', 'College MOU is required', (value) => value && Object.keys(value).length > 0)
    .test('fileSize', 'File size is too large. Maximum size is 5 MB', (value) => {
      if (!value) return true; // No file is fine
      return value.size <= 5242880; // 5 MB
    })
    .test('fileType', 'Unsupported file type', (value) => {
      if (!value) return true; // No file is fine
      return ['application/pdf'].includes(value.type);
    })
  ,
});



export const addStudentSchema = Yup.object().shape({
  studentName: Yup.string().required('Student Name is required'),
  EmailId: Yup.string().email('Invalid email address').required('Email ID is required'),
  ContactNo: Yup.number()
    .typeError('Contact No. must be a number')
    .positive('Contact No. must be a positive number')
    .integer('Contact No. must be an integer')
    .required('Contact No. is required')
    .test(
      'len',
      'Contact No. must be exactly 10 digits',
      (val) => val && val.toString().length === 10
    ),
  btechStream: Yup.string()
    .required('B.Tech Stream is required')
    .matches(/^[A-Za-z\s]+$/, 'B.Tech Stream cannot contain numbers'),
  currentSem: Yup.number()
    .typeError('Current Sem should be a number')
    .integer('Current Sem should be an integer')
    .positive('Current Sem should be a positive number')
    .required('Current Sem is required'),
  Domain: Yup.string().required('Domain is required'),
  Class10: Yup.number()
    .typeError('Class 10 % should be a number')
    .min(0, 'Class 10 % should be at least 0')
    .max(100, 'Class 10 % should not exceed 100')
    .required('Class 10 % is required'),
  Class12: Yup.number()
    .typeError('Class 12 % should be a number')
    .min(0, 'Class 12 % should be at least 0')
    .max(100, 'Class 12 % should not exceed 100')
    .required('Class 12 % is required'),
});




export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 'Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .matches(/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/, 'Invalid password format')
    .required('Password is required'),
});


export const passwordUpdateValidationSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Current Password is required'),
  updatedPassword: Yup.string()
    .required('New Password is required')
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
      `Password must meet the following criteria:\n
      • At least 8 characters long\n
      • At least one uppercase letter\n
      • At least one number\n
      • At least one special character (@, $,!, %, *, ?,#, or &)`
    )
    .test('has-uppercase', 'Password must contain at least one uppercase letter', (value) =>
      /[A-Z]/.test(value)
    )
    .test('has-number', 'Password must contain at least one number', (value) =>
      /\d/.test(value)
    )
    .test(
      'has-special-character',
      'Password must contain at least one special character (@, $, !, %, *, ?,#, or &)',
      (value) => /[@$!%*?&]/.test(value)
    )
    .min(8, 'Password must be at least 8 characters long'),
});



export const addCollegeRoleHrBuddySchema = Yup.object({
  Name: Yup.string().required("Name is required"),
  Email: Yup.string().email("Invalid email address").required("Email is required"),
  contactNo: Yup.string()
    .required('Contact Number is required')
    .matches(/^\d{10}$/, 'Invalid phone number (must be 10 digits)'),
  CollegeName: Yup.string().required("College Name is required"),
  Domain: Yup.string().required("Domain is required"),
});


export const addCelebalRoleHrBuddySchema = Yup.object({
  Name: Yup.string().required("Name is required"),
  Email: Yup.string()
    .email("Invalid email address")
    .required("Email is required")
    .matches(/^[a-zA-Z0-9._-]+@celebaltech\.com$/, 'Email must be of type @celebaltech.com'),
  CollegeName: Yup.string().required("College Name is required"),
  Domain: Yup.string().required("Domain is required"),
});



export const forgotpasswordValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});


export const otpValidationSchema = Yup.object().shape({
  otp: Yup.array().of(
    Yup.string().length(1, 'Each digit must be a single character')
  ).required('All OTP digits are required'),
});

export const newPasswordValidationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required('New Password is required')
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
      `Password must meet the following criteria:\n
      • At least 8 characters long\n
      • At least one uppercase letter\n
      • At least one number\n
      • At least one special character (@, $, !, %, *, ?,#, or &)`
    )
    .test('has-uppercase', 'Password must contain at least one uppercase letter', (value) =>
      /[A-Z]/.test(value)
    )
    .test('has-number', 'Password must contain at least one number', (value) =>
      /\d/.test(value)
    )
    .test(
      'has-special-character',
      'Password must contain at least one special character (@, $, !, %, *, ?,#, or &)',
      (value) => /[@$!%*?&]/.test(value)
    )
    .min(8, 'Password must be at least 8 characters long'),

  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('newPassword'), null], 'Confirm Password must match New Password'),
});




export const meetingValidationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  participants: Yup.string()
  .required('Participants are required')
  .test(
    'isValidEmails',
    'Invalid email format. Separate multiple emails with commas.',
    (value) => {
      const emails = value.split(',').map((email) => email.trim());
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emails.every((email) => emailRegex.test(email));
    }
  ),
  startTime: Yup.date()
    .required('Start Time is required')
    .nullable()
    .min(new Date(), 'Start Time cannot be in the past'),
  endTime: Yup.date()
    .min(Yup.ref('startTime'), 'End Time must be after Start Time')
    .required('End Date is required'),
  location: Yup.string().required('Location is required'),
  recurringSession: Yup.string().required('Reocurring Session is required'),
  description: Yup.string().required('Description is required'),
  meetingLink: Yup.string().url('Enter a valid URL').required('Meeting Link is required'),
  // Omitting the requirement for "department"
});

