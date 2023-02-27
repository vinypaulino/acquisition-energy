import {
  ArrayMaxSize,
  ArrayMinSize,
  IsIn,
  IsNotEmpty,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateAcquisitionDto {
  @MinLength(11)
  @MaxLength(14)
  @IsNotEmpty()
  numeroDoDocumento: string;

  @IsIn(['monofasico', 'bifasico', 'trifasico'])
  @IsNotEmpty()
  tipoDeConexao: string;

  @IsIn(['residencial', 'industrial', 'comercial', 'rural', 'poderPublico'])
  @IsNotEmpty()
  classeDeConsumo: string;

  @IsIn(['azul', 'branca', 'verde', 'convencional'])
  @IsNotEmpty()
  modalidadeTarifaria: string;

  @ArrayMinSize(3)
  @ArrayMaxSize(12)
  @Min(0, {
    each: true,
  })
  @Max(9999, {
    each: true,
  })
  historicoDeConsumo: number[];
}
