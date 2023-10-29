const admin = require('firebase-admin');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const dotenv = require('dotenv');

dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
  }),
});

async function login(req, res, next) {
  const auth = getAuth();

  try {
    const userCredential = await signInWithEmailAndPassword(auth, req.body.email, req.body.password);
    const user = userCredential.user;

    res.status(200).json(user.getIdToken());
  }
  catch (error) {
    console.error("Erro de login:", error);
    throw error;
  }
}

async function signup(req, res, next) {
  const auth = getAuth();

  try {
    await createUserWithEmailAndPassword(auth, req.body.email, req.body.password);
    res.status(201).json({message: "Usuário criado."});
  }
  catch (error) {
    console.error("Erro de cadastro:", error);
    throw error;
  }
}

async function isAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split('Bearer ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.body.user = decodedToken;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Forbidden' });
  }
}

async function makeUserAdmin(req, res) {
  const { userId } = req.body;

  await admin.auth().setCustomUserClaims(userId, { admin: true });

  return res.status(200).json({ message: 'Success' });
}

async function checkIfAdmin(req, res, next) {
  try {
    const authToken = req.authorization.split('Bearer ')[1];

    const userInfo = await admin.auth().verifyIdToken(authToken);

    if (userInfo.admin === true) {
      next();
    } else {
      return res.status(403).json({ error: 'Permissão negada' });
    }
  } catch (error) {
    console.error("Erro ao verificar permissão de administrador:", error);
    return res.status(403).json({ error: 'Forbidden' });
  }
}

module.exports = {
  isAuthenticated,
  makeUserAdmin,
  checkIfAdmin,
  login,
  signup,
};
