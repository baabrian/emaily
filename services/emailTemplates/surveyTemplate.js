const keys = require("../../config/keys");

module.exports = (survey) => {
  return `
    <html>
        <body>
            <div stlye="text-align:center">
                <h3>I'd like your input!</h3>
                <p>Please answer the follwing question:</p>
                <p>${survey.body}</p>
                <div>
                    <a href="${keys.redirectDomain}/api/survey/thanks">Yes</a>
                </div>
                <div>
                    <a href="${keys.redirectDomain}/api/survey/thanks">No</a>
                </div>
            </div>
        </body>
    </html>
  `;
};
