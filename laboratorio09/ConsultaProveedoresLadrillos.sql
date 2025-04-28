
SELECT m.Clave AS clave_material, p.RazonSocial
FROM materiales m
JOIN entregan e ON m.Clave = e.Clave
JOIN proveedores p ON e.RFC = p.RFC
WHERE m.Descripcion LIKE '%Ladrillos%';
