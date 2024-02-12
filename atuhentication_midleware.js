const basicAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    //Request ‘in Authorization başlığında ki ifade şu şekilde’dir. Basic YWRtaW46cGFzc3dvcmQ= yazılan middleware bu ifadeyi önce boşluk(“ “) dan ayırarak ikinci kısmı yani YWRtaW46cGFzc3dvcmQ= bu kodu alır. Sonra bunu base64 decode ederek admin:password ifadesini elde eder. Sonra bunu da “:” dan parçalar ve kullanıcı adı şifre değerini elde eder.
    const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64")
      .toString()
      .split(":");

    // Kullanıcı adı ve şifreyi kontrol et
    if (username === "admin" && password === "password") {
      // Kullanıcı adı ve şifre doğruysa bir
      // sonraki middleware'e veya route'a geç
      return next();
    }
  }

  // Kullanıcı adı veya şifre hatalıysa veya
  // Authorization başlığı eksikse 401 Unauthorized hatası ver
  res.status(401).json({ message: "Unauthorized" });
};

module.exports = basicAuth;
