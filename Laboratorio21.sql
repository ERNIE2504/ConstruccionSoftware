

SELECT 
    SUM(E.Cantidad) AS TotalCantidad, 
    SUM(E.Cantidad * M.Costo * (1 + m.impuesto / 100)) AS ImporteTotal
FROM Entregan E
JOIN Materiales M ON E.Clave = M.Clave
WHERE YEAR(E.Fecha) = 1997;

SELECT 
    P.RazonSocial, 
    COUNT(*) AS NumeroEntregas, 
    SUM(E.Cantidad * M.Costo * (1 + M.PorcentajeImpuesto / 100)) AS ImporteTotal
FROM Entregan E
JOIN Proveedores P ON E.RFC = P.RFC
JOIN Materiales M ON E.Clave = M.Clave
GROUP BY P.RazonSocial;

SELECT 
    M.Clave, 
    M.Descripcion, 
    SUM(E.Cantidad) AS TotalEntregada, 
    MIN(E.Cantidad) AS MinCantidad, 
    MAX(E.Cantidad) AS MaxCantidad, 
    SUM(E.Cantidad * M.Costo * (1 + M.PorcentajeImpuesto / 100)) AS ImporteTotal
FROM Entregan E
JOIN Materiales M ON E.Clave = M.Clave
GROUP BY M.Clave, M.Descripcion
HAVING AVG(E.Cantidad) > 400;

SELECT 
    P.RazonSocial, 
    M.Clave, 
    M.Descripcion, 
    AVG(E.Cantidad) AS PromedioCantidad
FROM Entregan E
JOIN Proveedores P ON E.RFC = P.RFC
JOIN Materiales M ON E.Clave = M.Clave
GROUP BY P.RazonSocial, M.Clave, M.Descripcion
HAVING AVG(E.Cantidad) >= 500;

SELECT 
    P.RazonSocial, 
    M.Clave, 
    M.Descripcion, 
    AVG(E.Cantidad) AS PromedioCantidad,
    CASE 
        WHEN AVG(E.Cantidad) < 370 THEN 'Grupo < 370'
        WHEN AVG(E.Cantidad) > 450 THEN 'Grupo > 450'
    END AS Grupo
FROM Entregan E
JOIN Proveedores P ON E.RFC = P.RFC
JOIN Materiales M ON E.Clave = M.Clave
GROUP BY P.RazonSocial, M.Clave, M.Descripcion
HAVING AVG(E.Cantidad) < 370 OR AVG(E.Cantidad) > 450;


INSERT INTO Materiales VALUES ('M001', 'Arena fina', 50, 16);
INSERT INTO Materiales VALUES ('M002', 'Cemento gris', 120, 16);
INSERT INTO Materiales VALUES ('M003', 'Grava', 70, 16);
INSERT INTO Materiales VALUES ('M004', 'Ladrillo rojo', 3, 8);
INSERT INTO Materiales VALUES ('M005', 'Varilla 3/8', 25, 16);


SELECT Clave, Descripcion 
FROM Materiales 
WHERE Clave NOT IN (SELECT DISTINCT Clave FROM Entregan);


select  RazonSocial
from  Proveedores P
WHERE EXISTS (
    SELECT 1 FROM Entregan E 
    JOIN Proyectos PR ON E.Numero = PR.Numero 
    WHERE PR.Denominacion = 'Vamos México' AND E.RFC = P.RFC
)
AND EXISTS (
    SELECT 1 FROM Entregan E 
    JOIN Proyectos PR ON E.Numero = PR.Numero 
    WHERE PR.Denominacion = 'Querétaro Limpio' AND E.RFC = P.RFC
);



SELECT Clave, Descripcion 
FROM Materiales 
WHERE Clave NOT IN (
    SELECT DISTINCT E.Clave 
    FROM Entregan E 
    JOIN Proyectos PR ON E.Numero = PR.Numero 
    WHERE PR.Denominacion = 'CIT Yucatán'
);



SELECT P.RazonSocial, AVG(E.Cantidad) AS PromedioCantidad
FROM Entregan E
JOIN Proveedores P ON E.RFC = P.RFC
GROUP BY P.RFC, P.RazonSocial
HAVING AVG(E.Cantidad) > (
    SELECT AVG(Cantidad) 
    FROM Entregan 
    WHERE RFC = 'VAGO780901'
);


SELECT P.RFC, P.RazonSocial
FROM Proveedores P
JOIN Entregan E ON P.RFC = E.RFC
JOIN Proyectos PR ON E.Numero = PR.Numero
WHERE PR.Denominacion = 'Infonavit Durango'
GROUP BY P.RFC, P.RazonSocial
HAVING SUM(CASE WHEN YEAR(E.Fecha) = 2000 THEN E.Cantidad ELSE 0 END) >
       SUM(CASE WHEN YEAR(E.Fecha) = 2001 THEN E.Cantidad ELSE 0 END);
