const {
  BlobSASPermissions,
  SharedKeyCredential,
  generateBlobSASQueryParameters,
} = require("@azure/storage-blob");

const {
  STORAGE_ACCOUNT_KEY,
  STORAGE_ACCOUNT_NAME,
  CONTAINERS,
} = require("./Constants/blobStorage");

const generateSasQueryToken = () => {
  const sharedKeyCredential = new SharedKeyCredential(STORAGE_ACCOUNT_NAME, STORAGE_ACCOUNT_KEY);
  const permissions = BlobSASPermissions.parse("racwd");
  const startDate = new Date();
  const expiryDate = new Date(startDate);
  expiryDate.setMinutes(startDate.getMinutes() + 100);
  startDate.setMinutes(startDate.getMinutes() - 100);
  const queryParams = generateBlobSASQueryParameters(
    {
      containerName: CONTAINERS.IMAGE,
      permissions: permissions.toString(),
      startTime: startDate,
      expiryTime: expiryDate,
    },
    sharedKeyCredential,
  );
  return {
    SAS_STRING: queryParams.toString(),
    CONTAINER_NAME: CONTAINERS.IMAGE,
    URL: `https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net/`,
  };
};

module.exports = generateSasQueryToken;
