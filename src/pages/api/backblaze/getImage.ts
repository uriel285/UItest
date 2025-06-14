/* import crypto from 'crypto';
import https from 'https';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function fetchWithAWSSignature(req: NextApiRequest, res: NextApiResponse) {
  try {
    
    // AWS access keys 
    const accessKey = '00549d36c174fa30000000002';
    const secretKey = 'K005MdE1i05u12qJMtZoWiSK5t9DNa8';

    // Request parameters
    const method = 'GET';
    const service = 's3';
    const host = 'prueba11111.s3.us-east-005.backblazeb2.com';
    const region = 'us-east-005';
    const endpoint = '/eqbelogo3.jpeg';

    // Create a datetime object for signing
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, '0');
    const day = String(now.getUTCDate()).padStart(2, '0');
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');
    const amzDate = `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
    const dateStamp = amzDate.slice(0, 8);

    // Create the canonical request
    const canonicalUri = endpoint;
    const canonicalQuerystring = '';
    const canonicalHeaders = `host:${host}\nx-amz-date:${amzDate}\n`;
    const signedHeaders = 'host;x-amz-date';
    const payloadHash = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'; // SHA-256 hash of an empty string
    const canonicalRequest = `${method}\n${canonicalUri}\n${canonicalQuerystring}\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`;

    // Create the string to sign
    const algorithm = 'AWS4-HMAC-SHA256';
    const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
    const hashCanonicalRequest = crypto.createHash('sha256').update(canonicalRequest).digest('hex');
    const stringToSign = `${algorithm}\n${amzDate}\n${credentialScope}\n${hashCanonicalRequest}`;

    // Sign the string
    const getSignatureKey = (key: string | undefined, dateStamp: crypto.BinaryLike, regionName: crypto.BinaryLike, serviceName: crypto.BinaryLike) => {
      const kDate = crypto.createHmac('SHA256', `AWS4${key}`).update(dateStamp).digest();
      const kRegion = crypto.createHmac('SHA256', kDate).update(regionName).digest();
      const kService = crypto.createHmac('SHA256', kRegion).update(serviceName).digest();
      const kSigning = crypto.createHmac('SHA256', kService).update('aws4_request').digest();
      return kSigning;
    };

    const signingKey = getSignatureKey(secretKey, dateStamp, region, service);
    const signature = crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex');

    // Add signing information to the request
    const authorizationHeader = `${algorithm} Credential=${accessKey}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

    // Make the request
    const options = {
      hostname: host,
      path: canonicalUri,
      method,
      headers: {
        'host': host,
        'x-amz-date': amzDate,
        'Authorization': authorizationHeader
      }
    };

    const req = https.request(options, (response) => {
      let responseBody: any[] = []; // Cambié a un arreglo vacío para acumular correctamente los fragmentos

      response.on('data', (chunk) => {
        responseBody.push(chunk); // Acumula los fragmentos
      });

      response.on('end', () => {
          const responseBuffer = Buffer.concat(responseBody);
          const responseText = responseBuffer.toString(); // Convierte el cuerpo a texto
          try {
            const jsonResponse = JSON.parse(responseText); // Intenta parsear como JSON
            console.log('Respuesta de Backblaze:', jsonResponse); // Imprime el error de Backblaze
            if (jsonResponse && jsonResponse.error) {
              res.status(500).json({ message: 'Error en la solicitud a Backblaze', details: jsonResponse });
            } else {
              res.setHeader('Content-Type', 'image/jpeg');
              res.status(200).send(responseBuffer); // Si no es un error, envía la imagen
            }
          } catch (error) {
            // Si no es JSON, probablemente sea una imagen, así que la enviamos
            res.setHeader('Content-Type', 'image/jpeg');
            res.status(200).send(responseBuffer);
          }
      });
    });

    req.on('error', (err) => {
      console.error(`Error: ${err.message}`);
      res.status(500).json({ message: 'Error al obtener la imagen desde AWS S3.' });
    });

    req.end();

  } catch (error) {
    console.error('Error al realizar la solicitud firmada:', error);
    res.status(500).json({ message: 'Error al obtener la imagen desde AWS S3.' });
  }
}
 */
import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import https from "https";

export default async function fetchWithAWSSignature(
  req: NextApiRequest, // Declaración correcta de 'req'
  res: NextApiResponse
) {
  try {
    const { path } = req.query;

    if (!path || typeof path !== "string") {
      return res.status(400).json({ message: "Path de la imagen es requerido." });
    }

    const accessKey = "00549d36c174fa30000000002";
    const secretKey = "K005MdE1i05u12qJMtZoWiSK5t9DNa8";

    const method = "GET";
    const service = "s3";
    const host = "prueba11111.s3.us-east-005.backblazeb2.com";
    const region = "us-east-005";
    const endpoint = `/${path.replace(/^\//, "")}`;

    const now = new Date();
    const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, "");
    const dateStamp = amzDate.slice(0, 8);

    const canonicalUri = endpoint;
    const canonicalHeaders = `host:${host}\nx-amz-date:${amzDate}\n`;
    const signedHeaders = "host;x-amz-date";
    const payloadHash = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
    const canonicalRequest = `${method}\n${canonicalUri}\n\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`;

    const algorithm = "AWS4-HMAC-SHA256";
    const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
    const hashCanonicalRequest = crypto.createHash("sha256").update(canonicalRequest).digest("hex");
    const stringToSign = `${algorithm}\n${amzDate}\n${credentialScope}\n${hashCanonicalRequest}`;

    const getSignatureKey = (key: string, dateStamp: string, region: string, service: string) => {
      const kDate = crypto.createHmac("sha256", `AWS4${key}`).update(dateStamp).digest();
      const kRegion = crypto.createHmac("sha256", kDate).update(region).digest();
      const kService = crypto.createHmac("sha256", kRegion).update(service).digest();
      return crypto.createHmac("sha256", kService).update("aws4_request").digest();
    };

    const signingKey = getSignatureKey(secretKey, dateStamp, region, service);
    const signature = crypto.createHmac("sha256", signingKey).update(stringToSign).digest("hex");

    const authorizationHeader = `${algorithm} Credential=${accessKey}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

    const options = {
      hostname: host,
      path: canonicalUri,
      method,
      headers: {
        host,
        "x-amz-date": amzDate,
        Authorization: authorizationHeader,
      },
    };

    const request = https.request(options, (response) => {
      const responseBody: Uint8Array[] = [];
      response.on("data", (chunk) => responseBody.push(chunk));
      response.on("end", () => {
        const responseBuffer = Buffer.concat(responseBody);
        res.setHeader("Content-Type", "image/jpeg");
        res.status(200).send(responseBuffer);
      });
    });

    request.on("error", (error) => {
      console.error("Error en la solicitud HTTPS:", error);
      res.status(500).json({ message: "Error al obtener la imagen desde AWS S3." });
    });

    request.end();
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({ message: "Error al procesar la solicitud." });
  }
}
