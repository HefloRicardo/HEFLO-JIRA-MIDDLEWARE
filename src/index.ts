import JiraApi from 'jira-client';
import * as config from '../config.json';

const jira = new JiraApi({
  protocol: 'https',
  host: config.JIRAHOST,
  username: config.JIRAUSERNAME,
  password: config.JIRATOKEN,
  apiVersion: '2',
  strictSSL: true
});


/**
 * Request JIRA's API to search users by the query term provided
 * @param query 
 */
async function getUsers(query: string) {
  const users = await jira.searchUsers({ username: query });

  // map users to simple json with id and text
  return users ? users.map(user => {
    return {
      id: user.key,
      text: user.name
    };
  }) : [];
}

/**
 * LAMBDA SERVERLESS HANDLER
 * This index handler is used for a 
 * @param event API Gateway proxy integration event
 * @param context AWS Lambda context
 * @param callback AWS Lambda callback function
 */
export function handler(event, context, callback) {

  // format respnse for API Gateway proxy integration
  const done = (err, res?: object) => callback(null, {
    statusCode: err ? '400' : '200',
    body: err ? err.message : JSON.stringify(res),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (event && event.queryStringParameters && event.queryStringParameters.search) {
    getUsers(event.queryStringParameters.search)
      .then((result) => done(null, result))
      .catch(ex => done(new Error(ex), null));
  }
  else
    done(new Error("Invalid event"));
}
