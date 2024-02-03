import React, {useContext} from "react";
import ChatContext from "../../Context/Context";
function EditTemplate() {
  const {
    introResp,
    sowResp,
    proposalsubmissionResp,
    eligibilityResp,
    timelineResp,
    requirementResp,
    contactResp,
  } = useContext(ChatContext);

  console.log(introResp,"introResp")

  let defaultDocument = {
    sections: [
      {
        sectionFormat: {
          pageWidth: 612,
          pageHeight: 792,
          leftMargin: 72,
          rightMargin: 72,
          topMargin: 72,
          bottomMargin: 72,
          differentFirstPage: false,
          differentOddAndEvenPages: false,
          headerDistance: 36,
          footerDistance: 36,
        },

        blocks: [
          {
            paragraphFormat: {
              styleName: "Heading 1",
              listFormat: {},
            },

            inlines: [
              {
                characterFormat: {
                  fontSize: 12.0,
                  bold: true,
                  italic: true,
                },
                text: "Introduction",
              },
            ],
          },
          {
            paragraphFormat: {
              firstLineIndent: 36,
              afterSpacing: 10,
              styleName: "Normal",
              listFormat: {},
            },
            characterFormat: {},
            inlines: [
              {
                characterFormat: {},
                text: introResp,
              },
            ],
          },
          {
            paragraphFormat: {
              styleName: "Heading 1",
              listFormat: {},
            },
            characterFormat: {},
            inlines: [
              {
                characterFormat: {
                  fontSize: 12.0,
                  bold: true,
                  italic: true,
                },
                text: "scope of work",
              },
            ],
          },
          {
            paragraphFormat: {
              firstLineIndent: 36,
              afterSpacing: 10,
              styleName: "Normal",
              listFormat: {},
            },
            characterFormat: {},
            inlines: [
              {
                characterFormat: {},
                text: sowResp,
              },
            ],
          },

          {
            paragraphFormat: {
              styleName: "Heading 1",
              listFormat: {},
            },
            characterFormat: {},
            inlines: [
              {
                characterFormat: {
                  fontSize: 12.0,
                  bold: true,
                  italic: true,
                },
                text: "Proposal Submission",
              },
            ],
          },
          {
            paragraphFormat: {
              firstLineIndent: 36,
              styleName: "Normal",
              afterSpacing: 10,
              listFormat: {},
            },
            characterFormat: {},
            inlines: [
              {
                characterFormat: {},
                text: proposalsubmissionResp,
              },
            ],
          },

          {
            paragraphFormat: {
              styleName: "Heading 1",
              listFormat: {},
            },
            characterFormat: {},
            inlines: [
              {
                characterFormat: {
                  fontSize: 12.0,
                  bold: true,
                  italic: true,
                },
                text: "Eligibility",
              },
            ],
          },
          {
            paragraphFormat: {
              firstLineIndent: 36,
              styleName: "Normal",
              afterSpacing: 10,
              listFormat: {},
            },
            characterFormat: {},
            inlines: [
              {
                characterFormat: {},
                text: eligibilityResp,
              },
            ],
          },

          {
            paragraphFormat: {
              styleName: "Heading 1",
              listFormat: {},
            },
            characterFormat: {},
            inlines: [
              {
                characterFormat: {
                  fontSize: 12.0,
                  bold: true,
                  italic: true,
                },
                text: "Timeline",
              },
            ],
          },
          {
            paragraphFormat: {
              firstLineIndent: 36,
              styleName: "Normal",
              afterSpacing: 10,
              listFormat: {},
            },
            characterFormat: {},
            inlines: [
              {
                characterFormat: {},
                text: timelineResp,
              },
            ],
          },

          {
            paragraphFormat: {
              styleName: "Heading 1",
              listFormat: {},
            },
            characterFormat: {},
            inlines: [
              {
                characterFormat: {
                  fontSize: 12.0,
                  bold: true,
                  italic: true,
                },
                text: "Requirements",
              },
            ],
          },
          {
            paragraphFormat: {
              firstLineIndent: 36,
              styleName: "Normal",
              afterSpacing: 10,
              listFormat: {},
            },
            characterFormat: {},
            inlines: [
              {
                characterFormat: {},
                text: requirementResp,
              },
            ],
          },

          {
            paragraphFormat: {
              styleName: "Heading 1",
              listFormat: {},
            },
            characterFormat: {},
            inlines: [
              {
                characterFormat: {
                  fontSize: 12.0,
                  bold: true,
                  italic: true,
                },
                text: "Contact Information",
              },
            ],
          },
          {
            paragraphFormat: {
              firstLineIndent: 36,
              styleName: "Normal",
              afterSpacing: 10,
              listFormat: {},
            },
            characterFormat: {},
            inlines: [
              {
                characterFormat: {},
                text: contactResp,
              },
            ],
          },
        ],
      },
    ],
  };
  return defaultDocument;
}

export default EditTemplate;
