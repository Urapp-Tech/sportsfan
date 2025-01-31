const handleResponse = async (req, res, promise) => {
    const log = req.logger;
    log.verbose(`RequestId:: ${req.id}\nHandling ${req.method} ${req.url} Route`);
  
    const [error, result] = await promise;
  
    if (error) {
      log.verbose(
        `RequestId:: ${req.id}\nHandling Completed With Error On ${req.method} ${req.url} Route`
      );
      log.error(
        `${error.message}\nRequestId:: ${req.id}\nTrace:: ${error.stack}`
      );
  
      return res.status(error.code || 500).send({
        success: false,
        code: error.code || 500,
        message: error.message || "Internal Server Error",
      });
    }
  
    log.verbose(
      `RequestId:: ${req.id}\nHandling Completed With Success On ${req.method} ${req.url} Route`
    );
  
    return res.status(result.code || 200).send({
      success: true,
      code: result.code || 200,
      message: result.message || "Success",
      data: result.data || null,
    });
  };
  
  export default handleResponse;
  