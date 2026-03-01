export default function SelecionarAtendente() {
  const [atendentes, setAtendentes] = useState([]);
  const [atendenteId, setAtendenteId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    listarAtendentes().then(setAtendentes);
  }, []);

  function continuar() {
    if (!atendenteId) {
      alert("Selecione um atendente");
      return;
    }
    navigate(`/criar-pedido/${atendenteId}`);
  }

 
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#242424",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          p: 4,
          backgroundColor: "#2f2f2f",
          borderRadius: 3,
          boxShadow: "0 0 20px rgba(0,0,0,0.6)",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            textAlign: "center",
            color: "#ffb347",
            mb: 3,
          }}
        >
          Selecione o atendente
        </Typography>

        <Select
          fullWidth
          value={atendenteId}
          onChange={(e) => setAtendenteId(e.target.value)}
          displayEmpty
          sx={{
            mb: 3,
            backgroundColor: "#242424",
            color: "#fff",
            borderRadius: 2,
          }}
        >
          <MenuItem value="">
            <em>Selecione...</em>
          </MenuItem>

          {atendentes.map((a) => (
            <MenuItem key={a.id} value={a.id}>
              {a.nome}
            </MenuItem>
          ))}
        </Select>

        <Button
          fullWidth
          variant="contained"
          sx={{
            py: 1.5,
            fontWeight: "bold",
            fontSize: "16px",
            backgroundColor: "#ff9800",
            "&:hover": {
              backgroundColor: "#ffb347",
            },
          }}
          onClick={continuar}
        >
          CONTINUAR
        </Button>
      </Box>
    </Box>
  );
}