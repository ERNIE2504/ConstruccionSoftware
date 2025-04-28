
SELECT 
    m.Descripcion AS descripcion_material, 
    p.RazonSocial, 
    pr.Denominacion AS denominacion_proyecto, 
    e.Fecha, 
    e.Cantidad
FROM entregan e
JOIN materiales m ON e.Clave = m.Clave
JOIN proveedores p ON e.RFC = p.RFC
JOIN proyectos pr ON e.Numero = pr.Numero
WHERE m.Descripcion LIKE '%Pintura%'
  AND YEAR(e.Fecha) = 1998;

