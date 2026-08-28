import * as React from "react"
import { forwardRef } from "react"
import { Shader } from "react-shaders"
import { cn } from "@/lib/utils"

export interface AuroraShadersProps extends React.HTMLAttributes<HTMLDivElement> {
  speed?: number
  intensity?: number
  vibrancy?: number
  frequency?: number
  stretch?: number
}

const auroraShader = `
// Noise function for organic movement
float noise(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}
float smoothNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = noise(i);
    float b = noise(i + vec2(1.0, 0.0));
    float c = noise(i + vec2(0.0, 1.0));
    float d = noise(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}
float fractalNoise(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for(int i = 0; i < 4; i++) {
        value += amplitude * smoothNoise(p);
        p *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord / iResolution.xy;
    float time = iTime * u_speed;
    float verticalGradient = 1.0 - abs(uv.y - 0.5) * 2.0;
    verticalGradient = pow(verticalGradient, u_stretch);
    vec2 flowUV = vec2(uv.x + time * 0.1, uv.y);
    float aurora1 = fractalNoise(flowUV * u_frequency * 3.0 + vec2(time * 0.2, 0.0));
    float aurora2 = fractalNoise(flowUV * u_frequency * 2.0 + vec2(time * 0.15, 1000.0));
    float aurora3 = fractalNoise(flowUV * u_frequency * 4.0 + vec2(time * 0.25, 2000.0));
    float wave1 = sin(uv.x * 8.0 + time * 2.0) * 0.1;
    float wave2 = sin(uv.x * 12.0 + time * 1.5) * 0.05;
    float distortedY = uv.y + wave1 + wave2;
    aurora1 *= smoothstep(0.3, 0.7, distortedY) * smoothstep(0.8, 0.6, distortedY);
    aurora2 *= smoothstep(0.4, 0.6, distortedY) * smoothstep(0.7, 0.5, distortedY);
    aurora3 *= smoothstep(0.35, 0.65, distortedY) * smoothstep(0.75, 0.55, distortedY);
    float combinedAurora = (aurora1 * 0.6 + aurora2 * 0.8 + aurora3 * 0.4) * verticalGradient;
    combinedAurora *= u_intensity;
    vec3 color1 = vec3(0.0, 0.8, 0.4);
    vec3 color2 = vec3(0.2, 0.4, 1.0);
    vec3 color3 = vec3(0.8, 0.2, 0.8);
    vec3 color4 = vec3(0.0, 1.0, 0.8);
    float colorMix1 = smoothstep(0.2, 0.4, uv.y);
    float colorMix2 = smoothstep(0.4, 0.6, uv.y);
    float colorMix3 = smoothstep(0.6, 0.8, uv.y);
    vec3 finalColor = mix(color1, color2, colorMix1);
    finalColor = mix(finalColor, color3, colorMix2);
    finalColor = mix(finalColor, color4, colorMix3);
    vec3 desaturated = vec3(dot(finalColor, vec3(0.299, 0.587, 0.114)));
    finalColor = mix(desaturated, finalColor, u_vibrancy);
    finalColor *= combinedAurora;
    float horizonGlow = exp(-abs(uv.y - 0.5) * 8.0) * 0.1;
    finalColor += finalColor * horizonGlow;
    finalColor = clamp(finalColor, 0.0, 1.0);
    fragColor = vec4(finalColor, 1.0);
}
`

export const AuroraShaders = forwardRef<HTMLDivElement, AuroraShadersProps>(
  (
    {
      className,
      speed = 1.0,
      intensity = 1.0,
      vibrancy = 1.0,
      frequency = 1.0,
      stretch = 1.0,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn("h-full w-full", className)} ref={ref} {...(props as unknown as React.HTMLAttributes<HTMLDivElement>)}>
        <Shader
          fs={auroraShader}
          style={{ width: "100%", height: "100%" } as unknown as React.CSSProperties}
          uniforms={{
            u_speed: { type: "1f", value: speed },
            u_intensity: { type: "1f", value: intensity },
            u_vibrancy: { type: "1f", value: vibrancy },
            u_frequency: { type: "1f", value: frequency },
            u_stretch: { type: "1f", value: stretch },
          }}
        />
      </div>
    )
  },
)

AuroraShaders.displayName = "AuroraShaders"
export default AuroraShaders
