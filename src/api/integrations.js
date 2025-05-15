// Mock implementations for integration functions after removing base44 dependency

export const Core = {
  InvokeLLM: async (params) => {
    console.warn("Core.InvokeLLM is a mock implementation and does not call any external service.", params);
    return { result: "Mock LLM response" };
  },
  SendEmail: async (params) => {
    console.warn("Core.SendEmail is a mock implementation and does not send any email.", params);
    return { success: true, message_id: "mock_message_id" };
  },
  UploadFile: async ({ file }) => {
    console.warn("Core.UploadFile is a mock implementation and does not actually upload any file.", file);
    // Simulate a successful upload and return a fake URL
    return { file_url: `/uploads/mock_${file.name}` };
  },
  GenerateImage: async (params) => {
    console.warn("Core.GenerateImage is a mock implementation and does not generate any image.", params);
    return { image_url: "/images/mock_generated_image.png" };
  },
  ExtractDataFromUploadedFile: async (params) => {
    console.warn("Core.ExtractDataFromUploadedFile is a mock implementation.", params);
    return { extracted_data: { mock_field: "mock_value" } };
  }
};

export const InvokeLLM = Core.InvokeLLM;
export const SendEmail = Core.SendEmail;
export const UploadFile = Core.UploadFile; // This is used in Settings.jsx
export const GenerateImage = Core.GenerateImage;
export const ExtractDataFromUploadedFile = Core.ExtractDataFromUploadedFile;

