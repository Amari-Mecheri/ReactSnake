// Direction specifies deltas in X and Y
export class Direction  {
	DX = 0
	DY = 0
	constructor(DX:number, DY:number){
		this.DX=DX
		this.DY=DY
	}
}

// Position defines coordinates
export class Position  {
	X =0
	Y =0
	constructor(x:number, y:number){
		this.X=x
		this.Y=y
	}
}

// Size is Width and Height
export class Size {
	Width  =0
	Height =0
	constructor(Width:number, Height:number){
		this.Width=Width
		this.Height=Height
	}
}

// Sprite holds a rune and its position
export class Sprite  {
	Value   = ' '.charCodeAt(0)
	Position = new Position(0,0)
	constructor(val: number, position: Position){
		this.Value = val
		this.Position = position
	}
}

// Errors holds error messages
export class Errors{
	error: string
	constructor(err: string){
		this.error = err
	}
}
