import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Copy, ArrowLeft, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  rgbToCmyk,
  cmykToRgb,
  validateHex,
  type RGB,
  type HSL,
  type CMYK
} from '@/lib/colorUtils';

const GOOGLE_COLORS = [
  { name: 'Blue', hex: '#4285F4' },
  { name: 'Green', hex: '#34A853' },
  { name: 'Yellow', hex: '#FBBC04' },
  { name: 'Red', hex: '#EA4335' },
];

export default function ColorConverter() {
  const { toast } = useToast();
  const [currentColor, setCurrentColor] = useState<RGB>({ r: 59, g: 130, b: 246 });
  const [hexInput, setHexInput] = useState('#3B82F6');
  const [rgbInput, setRgbInput] = useState({ r: '59', g: '130', b: '246' });
  const [hslInput, setHslInput] = useState({ h: '217', s: '91', l: '60' });
  const [cmykInput, setCmykInput] = useState({ c: '76', m: '47', y: '0', k: '4' });
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    const hsl = rgbToHsl(currentColor.r, currentColor.g, currentColor.b);
    const cmyk = rgbToCmyk(currentColor.r, currentColor.g, currentColor.b);
    const hex = rgbToHex(currentColor.r, currentColor.g, currentColor.b);

    setHexInput(hex);
    setRgbInput({ 
      r: currentColor.r.toString(), 
      g: currentColor.g.toString(), 
      b: currentColor.b.toString() 
    });
    setHslInput({ 
      h: hsl.h.toString(), 
      s: hsl.s.toString(), 
      l: hsl.l.toString() 
    });
    setCmykInput({ 
      c: cmyk.c.toString(), 
      m: cmyk.m.toString(), 
      y: cmyk.y.toString(), 
      k: cmyk.k.toString() 
    });
  }, [currentColor]);

  const handleHexChange = (hex: string) => {
    setHexInput(hex);
    if (validateHex(hex)) {
      const rgb = hexToRgb(hex);
      setCurrentColor(rgb);
    }
  };

  const handleRgbChange = (component: 'r' | 'g' | 'b', value: string) => {
    const numValue = parseInt(value) || 0;
    const clampedValue = Math.max(0, Math.min(255, numValue));
    
    setRgbInput(prev => ({ ...prev, [component]: value }));
    
    if (value !== '' && !isNaN(numValue)) {
      setCurrentColor(prev => ({ ...prev, [component]: clampedValue }));
    }
  };

  const handleHslChange = (component: 'h' | 's' | 'l', value: string) => {
    const numValue = parseInt(value) || 0;
    let clampedValue = numValue;
    
    if (component === 'h') {
      clampedValue = Math.max(0, Math.min(360, numValue));
    } else {
      clampedValue = Math.max(0, Math.min(100, numValue));
    }
    
    setHslInput(prev => ({ ...prev, [component]: value }));
    
    if (value !== '' && !isNaN(numValue)) {
      const h = component === 'h' ? clampedValue : parseInt(hslInput.h) || 0;
      const s = component === 's' ? clampedValue : parseInt(hslInput.s) || 0;
      const l = component === 'l' ? clampedValue : parseInt(hslInput.l) || 0;
      
      const rgb = hslToRgb(h, s, l);
      setCurrentColor(rgb);
    }
  };

  const handleCmykChange = (component: 'c' | 'm' | 'y' | 'k', value: string) => {
    const numValue = parseInt(value) || 0;
    const clampedValue = Math.max(0, Math.min(100, numValue));
    
    setCmykInput(prev => ({ ...prev, [component]: value }));
    
    if (value !== '' && !isNaN(numValue)) {
      const c = component === 'c' ? clampedValue : parseInt(cmykInput.c) || 0;
      const m = component === 'm' ? clampedValue : parseInt(cmykInput.m) || 0;
      const y = component === 'y' ? clampedValue : parseInt(cmykInput.y) || 0;
      const k = component === 'k' ? clampedValue : parseInt(cmykInput.k) || 0;
      
      const rgb = cmykToRgb(c, m, y, k);
      setCurrentColor(rgb);
    }
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast({
        title: 'Copied!',
        description: `${field} copied to clipboard`,
      });
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      toast({
        title: 'Failed to copy',
        description: 'Could not copy to clipboard',
        variant: 'destructive',
      });
    }
  };

  const handlePaletteColorClick = (hex: string) => {
    handleHexChange(hex);
  };

  const hex = rgbToHex(currentColor.r, currentColor.g, currentColor.b);
  const hsl = rgbToHsl(currentColor.r, currentColor.g, currentColor.b);
  const cmyk = rgbToCmyk(currentColor.r, currentColor.g, currentColor.b);

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b sticky top-0 z-50 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="font-display font-bold text-xl">Color Format Converter</h1>
          <div className="w-24"></div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12 max-w-5xl">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <Badge variant="outline" className="mb-2">SCHEMECOLOR</Badge>
            <h2 className="text-3xl font-display font-bold">Color Format Converter</h2>
            <p className="text-muted-foreground">Convert colors between HEX, RGB, HSL, and CMYK formats</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Color Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div 
                className="w-full h-48 rounded-lg border-4 border-border shadow-md transition-all"
                style={{ backgroundColor: hex }}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">HEX</label>
                    <div className="flex gap-2">
                      <Input
                        value={hexInput}
                        onChange={(e) => handleHexChange(e.target.value)}
                        placeholder="#000000"
                        className="font-mono"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(hex, 'HEX')}
                      >
                        {copiedField === 'HEX' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 font-mono">{hex}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">RGB</label>
                    <div className="flex gap-2">
                      <Input
                        value={rgbInput.r}
                        onChange={(e) => handleRgbChange('r', e.target.value)}
                        placeholder="R"
                        type="number"
                        min="0"
                        max="255"
                        className="w-full"
                      />
                      <Input
                        value={rgbInput.g}
                        onChange={(e) => handleRgbChange('g', e.target.value)}
                        placeholder="G"
                        type="number"
                        min="0"
                        max="255"
                        className="w-full"
                      />
                      <Input
                        value={rgbInput.b}
                        onChange={(e) => handleRgbChange('b', e.target.value)}
                        placeholder="B"
                        type="number"
                        min="0"
                        max="255"
                        className="w-full"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(`rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`, 'RGB')}
                      >
                        {copiedField === 'RGB' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 font-mono">
                      rgb({currentColor.r}, {currentColor.g}, {currentColor.b})
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">HSL</label>
                    <div className="flex gap-2">
                      <Input
                        value={hslInput.h}
                        onChange={(e) => handleHslChange('h', e.target.value)}
                        placeholder="H"
                        type="number"
                        min="0"
                        max="360"
                        className="w-full"
                      />
                      <Input
                        value={hslInput.s}
                        onChange={(e) => handleHslChange('s', e.target.value)}
                        placeholder="S"
                        type="number"
                        min="0"
                        max="100"
                        className="w-full"
                      />
                      <Input
                        value={hslInput.l}
                        onChange={(e) => handleHslChange('l', e.target.value)}
                        placeholder="L"
                        type="number"
                        min="0"
                        max="100"
                        className="w-full"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, 'HSL')}
                      >
                        {copiedField === 'HSL' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 font-mono">
                      hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">CMYK</label>
                    <div className="flex gap-2">
                      <Input
                        value={cmykInput.c}
                        onChange={(e) => handleCmykChange('c', e.target.value)}
                        placeholder="C"
                        type="number"
                        min="0"
                        max="100"
                        className="w-full"
                      />
                      <Input
                        value={cmykInput.m}
                        onChange={(e) => handleCmykChange('m', e.target.value)}
                        placeholder="M"
                        type="number"
                        min="0"
                        max="100"
                        className="w-full"
                      />
                      <Input
                        value={cmykInput.y}
                        onChange={(e) => handleCmykChange('y', e.target.value)}
                        placeholder="Y"
                        type="number"
                        min="0"
                        max="100"
                        className="w-full"
                      />
                      <Input
                        value={cmykInput.k}
                        onChange={(e) => handleCmykChange('k', e.target.value)}
                        placeholder="K"
                        type="number"
                        min="0"
                        max="100"
                        className="w-full"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(`cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`, 'CMYK')}
                      >
                        {copiedField === 'CMYK' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 font-mono">
                      cmyk({cmyk.c}%, {cmyk.m}%, {cmyk.y}%, {cmyk.k}%)
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Color Palette (Google Colors)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {GOOGLE_COLORS.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => handlePaletteColorClick(color.hex)}
                    className="group relative overflow-hidden rounded-lg border-2 border-border hover:border-primary transition-all hover:scale-105 cursor-pointer"
                  >
                    <div 
                      className="h-32 w-full" 
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-background/90 backdrop-blur-sm p-3 text-center">
                      <p className="font-medium text-sm">{color.name}</p>
                      <p className="text-xs text-muted-foreground font-mono">{color.hex}</p>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
