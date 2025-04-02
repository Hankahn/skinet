using API.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class BuggyController : BaseApiController {

    [HttpGet("unauthorized")]
    public IActionResult GetUnauthorized() {
        return Unauthorized();
    }
    
    [HttpGet("badrequest")]
    public IActionResult GetBadRequest() {
        return BadRequest("Bad Request");
    }
    
    [HttpGet("notfound")]
    public IActionResult GetNotFound() {
        return NotFound();
    }
    
    [HttpGet("internalerror")]
    public IActionResult GetInternalError() {
        throw new Exception("Test Internal Error");
    }
    
    [HttpPost("validationerror")]
    public IActionResult GetValidationError(ProductDto product) {
        return Ok();
    }

}