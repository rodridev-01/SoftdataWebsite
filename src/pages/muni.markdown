# PROCEDIMIENTOS MUNI

```sql
CREATE PROCEDURE [dbo].[SP_REGISTRARPAGOS]
    @accion VARCHAR(100) OUTPUT,
    @CODIGO_CONTRIB INT,
    @FECHA_P1 VARCHAR(10),
    @FECHA_P2 VARCHAR(10),
    @FECHA_P3 VARCHAR(10),
    @FECHA_P4 VARCHAR(10),
    @admin VARCHAR(50)
AS
BEGIN
    IF (@accion = '1') -- Insertar
    BEGIN
        IF EXISTS (SELECT * FROM CUOTAS_ARBITRIOS WHERE CODIGO_CONTRIB1 = @CODIGO_CONTRIB AND (F1PAGO IS NULL OR F1PAGO='') OR (F2PAGO IS NULL OR F2PAGO='') OR (F3PAGO IS NULL OR F3PAGO='') OR (F4PAGO IS NULL OR F4PAGO=''))
        BEGIN
            UPDATE CUOTAS_ARBITRIOS
            SET F1PAGO = CASE WHEN ISNULL(F1PAGO, '') = '' THEN @FECHA_P1 ELSE F1PAGO END,
                F2PAGO = CASE WHEN ISNULL(F2PAGO, '') = '' THEN @FECHA_P2 ELSE F2PAGO END,
                F3PAGO = CASE WHEN ISNULL(F3PAGO, '') = '' THEN @FECHA_P3 ELSE F3PAGO END,
                F4PAGO = CASE WHEN ISNULL(F4PAGO, '') = '' THEN @FECHA_P4 ELSE F4PAGO END,
                admin = @admin
            WHERE CODIGO_CONTRIB1 = @CODIGO_CONTRIB;

            UPDATE CUOTAS_ARBITRIOS
            SET PAGO1 = CASE WHEN ISNULL(F1PAGO, '') = '' THEN 0 ELSE TRIM1 END,
                PAGO2 = CASE WHEN ISNULL(F2PAGO, '') = '' THEN 0 ELSE TRIM2 END,
                PAGO3 = CASE WHEN ISNULL(F3PAGO, '') = '' THEN 0 ELSE TRIM3 END,
                PAGO4 = CASE WHEN ISNULL(F4PAGO, '') = '' THEN 0 ELSE TRIM4 END,
                ESTADO = CASE WHEN (ISNULL(F1PAGO, '') = '' OR ISNULL(F2PAGO, '') = '' OR ISNULL(F3PAGO, '') = '' OR ISNULL(F4PAGO, '') = '') THEN 'POR PAGAR' ELSE 'PAGADO' END
            WHERE CODIGO_CONTRIB1 = @CODIGO_CONTRIB;

            SET @accion = 'Pago registrado en forma satisfactoria.';
        END
    END
    ELSE IF (@accion = '2') 
    BEGIN
        UPDATE CUOTAS_ARBITRIOS
        SET F1PAGO = NULL,
            PAGO1 = 0.00,
            ESTADO = 'POR PAGAR',
            admin = @admin
        WHERE CODIGO_CONTRIB1 = @CODIGO_CONTRIB;

        SET @accion = 'Pago del 1er trimestre eliminado.';
    END
    ELSE IF (@accion = '3') 
    BEGIN
        UPDATE CUOTAS_ARBITRIOS
        SET F2PAGO = NULL,
            PAGO2 = 0.00,
            ESTADO = 'POR PAGAR',
            admin = @admin
        WHERE CODIGO_CONTRIB1 = @CODIGO_CONTRIB;

        SET @accion = 'Pago del 2do trimestre eliminado.';
    END
    ELSE IF (@accion = '4') 
    BEGIN
        UPDATE CUOTAS_ARBITRIOS
        SET F3PAGO = NULL,
            PAGO3 = 0.00,
            ESTADO = 'POR PAGAR',
            admin = @admin
        WHERE CODIGO_CONTRIB1 = @CODIGO_CONTRIB;

        SET @accion = 'Pago del 3ero trimestre eliminado.';
    END
    ELSE IF (@accion = '5') 
    BEGIN
        UPDATE CUOTAS_ARBITRIOS
        SET F4PAGO = NULL,
            PAGO4 = 0.00,
            ESTADO = 'POR PAGAR',
            admin = @admin
        WHERE CODIGO_CONTRIB1 = @CODIGO_CONTRIB;

        SET @accion = 'Pago del 4to trimestre eliminado.';
    END
END;